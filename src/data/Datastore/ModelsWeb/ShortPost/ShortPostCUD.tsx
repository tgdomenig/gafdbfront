
import { DataStore, Predicates } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill';

import { DsShortPost } from '../../../../models';
import { ShortPostInit } from '../Base/InitTypes';

/* ----------------------------- SAVE ----------------------- */
export async function saveShortPost(input: ShortPostInit) : Promise<DsShortPost> {
  const result = await DataStore.save(new DsShortPost(input));
  return result;
}
