
import { DataStore } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsParticipation, DsRole } from '../../../../models';
import { chooseFirst } from '../../../../util/common/general/collections';

export type getDsParticipationsProps = {
  missionId?: string,
  concoursRoundId?: string
}

/*
    Bemerkung: Wenn sessionId angegeben wird, ist concoursRoundId redundant
*/
export async function getDsParticipations(props?: getDsParticipationsProps) : Promise<DsParticipation[]> {
  const {missionId, concoursRoundId} = props || {};

  let recs;

  if (missionId && concoursRoundId) {
    recs = await _getMissionRoundParticipations(missionId, concoursRoundId);
  }
  else if (missionId) {
    recs = await _getMissionParticipations(missionId);
  }
  else if (concoursRoundId) {
    recs = await _getRoundParticipations(concoursRoundId);
  }
  else {
    recs = await _getAll();
  }

  return recs;
}

/*
// Note: Participations don't have a displayId, instead the are identified via person's displayId and ConcoursRound
export async function fGetDsParticipation(personDisplayId: string, concoursRoundDisplayId: string, role: DsRole) : Promise<DsParticipation|undefined> {
  const dsPerson = await fGetDsPerson(personDisplayId);
  const dsConcoursRound = await fGetDsConcoursRound(concoursRoundDisplayId);
  if (dsPerson && dsConcoursRound) {
    const dsMission = await getSpecificDsMission(dsPerson.id, dsConcoursRound.concoursId, role);
    if (dsMission) {
      const recs = await getDsParticipations({missionId: dsMission.id, concoursRoundId: dsConcoursRound.id});
      return chooseFirst(recs);    
    }
  }
}
*/

export async function getDsParticipation(id: string) : Promise<DsParticipation|undefined> {
  return await _get(id);
}


export async function fGetDsParticipation(displayId: string) : Promise<DsParticipation|undefined> {
  return await _fGet(displayId);
}

/* YYY
export async function getDSPerformedPieces(competitorId: string) : Promise<DsMusicPiece[]> {
  return await DataStore.query(DsMusicPiece, (piece) => piece.performedBy.dsCompetitor.id.eq(competitorId));
}

export async function findDSChosenPieces(yearOfConcours: string, roundName: RoundNb, competitorName: string) : Promise<DsMusicPiece[]> {
  const competitor = await findDsCompetitor(yearOfConcours, roundName, competitorName);
  if (competitor) {
    return await getDSChosenPieces(competitor.id);
  }
  else {
    return [];
  }
}
*/

/* YYY
export async function findDSPerformedPieces(yearOfConcours: string, roundName: RoundNb, competitorName: string) : Promise<DsMusicPiece[]> {
  const competitor = await findDsCompetitor(yearOfConcours, roundName, competitorName);
  if (competitor) {
    return await getDSPerformedPieces(competitor.id);
  }
  else {
    return [];
  }
}
*/

// export async function xFindDsParticipation(yearOfConcours: string) : Promise<DsConcours> {
//   const recs = (await DataStore.query(DsConcours)).filter(concours => concours.yearOfConcours === yearOfConcours);
//   if (! recs || recs.length === 0) {
//     throw new Error("ITC-Error: Concours " + yearOfConcours + " not found!");
//   }
//   else if (recs.length > 1) {
//     throw new Error("ITC-Error: Multiple Records for Concours " + yearOfConcours + " found!");
//   }
//   return recs[0];
// }

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsParticipation | undefined> => 
      await DataStore.query(DsParticipation, id);

const _fGet = async (displayId: string) : Promise<DsParticipation | undefined> => 
  chooseFirst(await DataStore.query(DsParticipation, rec => rec.displayId.eq(displayId)), displayId);

const _getAll = async () : Promise<DsParticipation[]> => 
      await DataStore.query(DsParticipation);

const _getMissionParticipations = async (missionId: string) : Promise<DsParticipation[]> =>
      await DataStore.query(DsParticipation, ppn => ppn.missionId.eq(missionId));

const _getRoundParticipations = async (roundId: string) : Promise<DsParticipation[]> =>
      await DataStore.query(DsParticipation, ppn => ppn.concoursRoundId.eq(roundId));

const _getMissionRoundParticipations = async (missionId: string, roundId: string) : Promise<DsParticipation[]> =>
      await DataStore.query(DsParticipation, ppn => ppn.and(p => [p.missionId.eq(missionId), p.concoursRoundId.eq(roundId)]));
