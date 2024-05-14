
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsVote } from '../../../../models';

export async function getDsVote(id: string) : Promise<DsVote|undefined> {
  return await DataStore.query(DsVote, id);
}
