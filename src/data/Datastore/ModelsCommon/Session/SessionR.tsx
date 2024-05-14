
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsSession } from '../../../../models';
import { fGetDsConcoursRound } from '../Round/RoundR';
import { chooseFirst } from '../../../../util/common/general/collections';


/* ----------------------------- GET ----------------------- */
export async function getDsSessions(roundId: string) : Promise<DsSession[]> {
  return roundId ? await _getRound(roundId, true) : [];
}

export async function fGetDsSession(displayId: string) : Promise<DsSession|undefined> {
  return await _fGet(displayId);
}

export async function getDsSession(sessionId: string) {
  return await _get(sessionId);
}

export async function fGetDsSessions(roundDisplayId: string) : Promise<DsSession[]> {
  return await _fGetRound(roundDisplayId, true);
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsSession | undefined> => 
      await DataStore.query(DsSession, id);

const _fGet = async (displayId: string) : Promise<DsSession | undefined> => 
  chooseFirst(await DataStore.query(DsSession, rec => rec.displayId.eq(displayId)), displayId);


const _getRound = async (roundId: string, sorted = true) => {
      const recs = await DataStore.query(DsSession, rec => rec.concoursRoundId.eq(roundId));
      if (sorted) {
        recs.sort(_sortSessions);
      }
      return recs;
}

const _fGetRound = async (roundDisplayId: string, sorted = true) : Promise<DsSession[]> => {
  const round = await fGetDsConcoursRound(roundDisplayId);
  return round ? await _getRound(round.id, sorted) : [];
}

const _sortSessions = (b: DsSession, a: DsSession) => 
      (! a.date) 
        ? 1 
        : ((! b.date) 
            ? -1 
            : ((a.date < b.date) 
                ? 1 
                : ((a.date > b.date)
                    ? -1
                    : ((! a.start) 
                        ? 1
                        : ((! b.start)
                            ? -1
                            : ((a.start < b.start)
                                ? 1
                                : -1
                              )
                          )
                      )
                  )
              )
        );
