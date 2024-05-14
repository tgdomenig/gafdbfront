
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsConcert, PerformedConcert } from '../../../../models';
import { DsConcertInit } from './InitTypes';
import { fGetDsPerson } from '../../ModelsCommon/Person/PersonR';

async function findDsConcertByWpId(wpId: string) : Promise<DsConcert | undefined> {
  return (await DataStore.query(DsConcert)).find(concert => concert.wpId === wpId);
}

/* ----------------------------- SAVE ----------------------- */

export async function saveConcert(input: DsConcertInit) : Promise<DsConcert> {
  const {managedArtists, ...rest} = input;

  const concert = await DataStore.save(new DsConcert(rest));

  for (const mgdArtist of managedArtists) {
    const person = await fGetDsPerson(mgdArtist);
    if (person) {
      await DataStore.save(new PerformedConcert({dsPerson: person, dsConcert: concert}));
    }
  }

  return concert;
}

export async function saveOrUpdateConcert(input: DsConcertInit) : Promise<DsConcert> {
  const original = await findDsConcertByWpId(input.wpId);
  if (original) {
    await DataStore.delete(original);
  }
  return await saveConcert(input);
}
