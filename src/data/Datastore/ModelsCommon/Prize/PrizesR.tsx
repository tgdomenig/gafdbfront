
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsConcoursPrize } from '../../../../models';
import { sortNReturn } from '../Base/Util';

export type getDsPrizesProps = {
  missionId?: string,
  concoursId?: string
}

/* 
Bemerkung: hier sollte nur entweder missionId oder concoursId (oder keine von beiden) angegeben werden.
Die Angabe von missionId und concoursId wäre redundant.
*/
export async function getDsConcoursPrizes(props?: getDsPrizesProps) : Promise<DsConcoursPrize[]> {
  const {missionId, concoursId} = props || {};
  let recs;

  if (missionId && concoursId) {
    recs = await _getConcoursMissionPrizes(concoursId, missionId);
  }
  else if (missionId) {
    recs = await _getMissionPrizes(missionId);
  }
  else if (concoursId) {
    recs = await _getConcoursPrizes(concoursId);
  }
  else {
    recs = await _getAll();
  }
  return sortNReturn(recs);
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsConcoursPrize | undefined> => 
      await DataStore.query(DsConcoursPrize, id);

const _getAll = async () : Promise<DsConcoursPrize[]> => 
      await DataStore.query(DsConcoursPrize);

const _getConcoursPrizes = async (concoursId: string) : Promise<DsConcoursPrize[]> =>
      await DataStore.query(DsConcoursPrize, prize => prize.concoursId.eq(concoursId));

const _getMissionPrizes = async (missionId: string) : Promise<DsConcoursPrize[]> =>
      await DataStore.query(DsConcoursPrize, prize => prize.missionId.eq(missionId));

const _getConcoursMissionPrizes = async (concoursId: string, missionId: string) : Promise<DsConcoursPrize[]> =>
      await DataStore.query(DsConcoursPrize, prize => prize.and(p => [p.concoursId.eq(concoursId), prize.missionId.eq(missionId)]));


