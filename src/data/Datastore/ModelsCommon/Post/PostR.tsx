
import { DataStore } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsPost, DsPublicationStatus } from '../../../../models';
import { sortByDisplayIdNReturn, sortNReturn } from '../Base/Util';
import { filteredMapAsync } from '../../../../util/common/general/collections';
import { chooseFirst } from "../../../../util/common/general/collections";
import { QueryOperator, getDSPublishable, getDsPublishableProps } from '../Base/getDsPublishable';
import { itcAssert } from '../../../../util/common/general/tests';

export type getDsPostsProps = {
  whichPosts?: string,
  sortBy?: 'sort' | 'displayId'
}

/*
Note: This method returns only published posts, unless the posts are specified specifically via id or displayId
*/
export async function getDsPosts(props?: getDsPostsProps) : Promise<DsPost[]> {

  let effectiveSort = props?.sortBy;

  const {whichPosts} = props || {};

  let recs = [] as DsPost[];
  if (whichPosts) {
    const {category, displayIds, ids} = parseWhichPosts(whichPosts);

    if (ids.length > 0) {
      effectiveSort = undefined; // doesn't seem to make sense to sort if ids are provided as a list
      recs = await filteredMapAsync(_get, ids);
    }
    if (displayIds.length > 0) {
      effectiveSort = undefined; // doesn't seem to make sense to sort if displayIds are provided as a list
      recs = await filteredMapAsync(_fGet, displayIds);
    }
    else if (category) {
      recs = await _getCategoryStatus(category, DsPublicationStatus.PUBLISHED, "eq");
    }
  }
  else {
    recs = await _getStatus(DsPublicationStatus.PUBLISHED, "eq");
  }

  return (! effectiveSort) 
    ? recs
    : (effectiveSort === 'displayId') 
    ? sortByDisplayIdNReturn(recs)
    : sortNReturn(recs);
}

export async function getDsPost(postId: string) : Promise<DsPost | undefined> {
  return await _get(postId);
}

export async function fGetDsPost(displayId: string) : Promise<DsPost | undefined> {
  return await _fGet(displayId);
}

/* 
This method follows the standard pattern for publishable items (like ShortPosts and Concerts).
There is some overlap to getDsPosts
*/
export async function getDsPostsByStatus(props: getDsPublishableProps): Promise<DsPost[]> {
  return await getDSPublishable(
    props,
    {
      getAll: _getAll,
      getCategory: _getCategory,
      getStatus: _getStatus,
      getCategoryStatus: _getCategoryStatus
    }
  );
}

export function matchWhichPosts(whichPosts: string, posts: DsPost[]) : DsPost[] {
  const {category, displayIds, ids} = parseWhichPosts(whichPosts);

    if (displayIds.length > 0) {
      return posts.filter(p => displayIds.includes(p.displayId));
    }
    else if (ids.length > 0) {
      return posts.filter(p => ids.includes(p.id));
    }
    else if (category) {
      return posts.filter(p => p.category === category);
    }
    else {
      return [];
    }
}

export function matchesWhichPosts(whichPosts: string, post: DsPost) : boolean {
  const {category, displayIds, ids} = parseWhichPosts(whichPosts);

  if (displayIds.length > 0) {
    return displayIds.includes(post.displayId);
  }
  else if (ids.length > 0) {
    return ids.includes(post.id);
  }
  else if (category) {
    return post.category === category;
  }
  else {
    return false;
  }
}

function parseWhichPosts(whichPosts: string) : {category: string|undefined, displayIds: string[], ids: string[]} {

  const regex = /^([^:]+):(.+)$/;
  const match = regex.exec(whichPosts);

  const result = { category: "", displayIds:[], ids: [] };

  if (match) {
    const key = match[1].trim().toUpperCase();
    if (key === "DISPLAY_ID" || key == "DISPLAY_IDS") {
      return { ...result, displayIds: match[2].split(",").map(s => s.trim()) };
    }
    if (key === "ID" || key == "IDS") {
      return { ...result, ids: match[2].split(",").map(s => s.trim()) }
    }
    else if (key == "POST_CATEGORY") {
      return { ...result, category: match[2].trim() };
    }
  }

  console.error("Could not parse whichPosts", whichPosts);
  return result;
}


/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsPost | undefined> => 
      await DataStore.query(DsPost, id);

const _fGet = async (displayId: string) : Promise<DsPost | undefined> => {
  const result = chooseFirst(await DataStore.query(DsPost, rec => rec.displayId.eq(displayId)), displayId);
  return result;
}

const _getAll = async () : Promise<DsPost[]> => 
      await DataStore.query(DsPost);

const _getCategory = async (category: string) : Promise<DsPost[]> =>
      await DataStore.query(DsPost, post => post.category.eq(category));

const _getCategoryStatus = async (category: string, status: DsPublicationStatus, op: QueryOperator) : Promise<DsPost[]> => 
    (op === "eq")
      ? await DataStore.query(DsPost, p => p.and(p => [p.category.eq(category), p.publicationStatus.eq(status)]))
      : await DataStore.query(DsPost, p => p.and(p => [p.category.eq(category), p.publicationStatus.ne(status)]))
    
const _getStatus = async (status: DsPublicationStatus, op: QueryOperator) : Promise<DsPost[]> => 
    (op === "eq")
      ? await DataStore.query(DsPost, p => p.publicationStatus.eq(status))
      : await DataStore.query(DsPost, p => p.publicationStatus.ne(status))
    