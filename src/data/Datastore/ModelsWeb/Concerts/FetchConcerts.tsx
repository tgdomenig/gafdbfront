
// import { fetchRestData } from './FetchData';
import { fetchListData } from '../../Fetch/FetchData';

import { FetchedConcert } from './InitTypes';

export async function fetchConcerts({lastUpdateDate}: {lastUpdateDate: Date}) : Promise<FetchedConcert[]|undefined> {

  const ENDPOINT = `https://www.geza-anda.ch/wp-json/wp/v2/itc_cpt_concert`;
  const PER_PAGE = 50;

  const {events, error} = await fetchListData<FetchedConcert>({endpoint: ENDPOINT, modifiedDate: lastUpdateDate, perPage: PER_PAGE});
  if (error) { throw error; }

  return events;
}
