
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsVoting } from '../../../../models';

export async function getAllDsVotings() : Promise<DsVoting[]> {
  return await DataStore.query(DsVoting);
}

export async function getDsVoting(id: string) : Promise<DsVoting|undefined> {
  return await DataStore.query(DsVoting, id);
}

export async function fGetDsVoting(displayId: string) : Promise<DsVoting|undefined> {
  return (await DataStore.query(DsVoting)).find(voting => voting.displayId ===displayId);
}
