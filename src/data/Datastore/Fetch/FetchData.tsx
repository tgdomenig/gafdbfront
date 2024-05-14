
import {format} from 'date-fns';

import {FetchListResponse, FetchResponse, FetchArgs, FetchResult, FetchListArgs, FetchListResult} from './Types';
import { ImageInit } from '../ModelsWeb/Base/InitTypes';
import { FetchedWpFeaturedMedia } from '../ModelsWeb/News/InitTypes';
import { RestAPIEndpointMedia } from './Config';

type _FetchResponse = {
  status: number,
  statusText: string,
  headers: {get: Function},
  json: Function
}

function _fetchFn(response: _FetchResponse) {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.statusText);
  }
  else {
    return (
      {
        totalEvents: response.headers.get('x-wp-total'),
        totalPages: response.headers.get('x-wp-totalpages'),
        jsonData: response.json() // resonse.json() returns promise
      }
    );
  }
}

export async function fetchData<FetchedType>({endpoint}: FetchArgs): Promise<FetchResult<FetchedType>> {
  
  console.log("FETCHING DATA:");
  console.log(endpoint);

  const result = await fetch(endpoint).then(_fetchFn).catch(error => ({error})) as FetchResponse<FetchedType>;
  const { jsonData, error } = result;

  return { data: await jsonData, error };
}

// fetch concerts via WP Rest API. The concerts are filtered by the wp-filter "rest_itc_cpt_concert_query" in functions.php
export async function fetchListData<FetchedType>({endpoint, modifiedDate, startDate, startDateName, perPage=100, order, orderby}: FetchListArgs): Promise<FetchListResult<FetchedType>> {

  let slug = endpoint, separator = "?";
  
  // if (modifiedDate) {
  //   slug += `${separator}modified_after=${format(modifiedDate, "yyyyMMdd")}`;
  //   separator = "&";
  // }
  if (modifiedDate) {
    slug += `${separator}modified_after=${modifiedDate.toISOString()}`;
    separator = "&";
  }
  if (startDate) {
    slug += `${separator}${startDateName}=${format(startDate, "yyyyMMdd")}`;
    separator = "&";
  }
  if (perPage) {
    slug += `${separator}per_page=${perPage}`;
    separator = "&";
  }
  if (order) {
    slug += `${separator}order=${order}`;
    separator = "&";
  }
  if (orderby) {
    slug += `${separator}orderby=${orderby}`;
    separator = "&";
  }

  let fetchedEvents: FetchedType[] = []; let page = 1, go_on = true;

  while (go_on) {

    const uri = `${slug}&page=${page}`;
    
    
    console.log("FETCHING LIST DATA:");
    console.log(uri);
    
   
    const result = await fetch(uri).then(_fetchFn).catch(error => ({error})) as FetchListResponse<FetchedType>;
    const {totalPages, jsonData, error} = result;

    console.log(`page: ${page}, total Pages: ${totalPages}`);
//    console.log(result);

    if (error) {
      return ({error});
    }


    const events: FetchedType[] = await jsonData;

    /*
    console.log("EVENTS for: " + uri);
    console.log(events);
    */

    if (events && events.length > 0) {
      fetchedEvents = [...fetchedEvents, ...events];
    }
  
    if ((! totalPages) || page >= totalPages) { // end of data
      go_on = false;
    }

    page = page + 1;
  }
  
  return ({events: fetchedEvents});
}

export async function fetchFeaturedImage(mediaId: number): Promise<ImageInit | undefined> {

  const endpoint = RestAPIEndpointMedia + mediaId.toString();
  const { data, error } = await fetchData<FetchedWpFeaturedMedia>({ endpoint });

  if (error || !data) {
    return undefined;
  }

  const { title, media_details } = data;

  const sm = media_details.sizes.medium?.source_url;
  const md = media_details.sizes.medium_large || media_details.sizes.full;

  return (!md) ? undefined : {
    sm,
    md: md.source_url,
    alt: { en_US: title?.rendered, de_DE: title?.rendered, fr_FR: title?.rendered }
  };
}

