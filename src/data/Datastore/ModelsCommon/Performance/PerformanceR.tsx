
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsPerformance } from '../../../../models';

export type getDsPerformancesProps = {
  musicPieceId?: string,
  competitorId?: string
}

/*
DEP VERSION:

Bemerkung: die simulierten Daten enthalten Youtube-Links für alle ausgewählten Stücke. 
Gezeigt sollen aber nur diejenigen werden, die einer Session zugewiesen werden (d.h. wo die Pianisten die entsprechende Runde erreichen).
Der Indikator hierfür ist die SessionId.

export async function getActualDsPerformances(props: getDsPerformancesProps) : Promise<DsPerformance[]> {
  const dsPerformances = await getDsPerformances(props);

  return await filteredMapAsync(async (dsPerformance: DsPerformance) =>
    {
      const participation = await getDsParticipation(dsPerformance.playedBy);
      return (participation && participation.sessionId) ? dsPerformance : undefined;
    },
    dsPerformances);
}
*/

export async function getDsPerformances({musicPieceId, competitorId}: getDsPerformancesProps) : Promise<DsPerformance[]> {

  if (musicPieceId) {
    return await _getMusicPiecePerformances(musicPieceId);
  }
  else if (competitorId) {
    return await _getCompetitorPerformances(competitorId);
  }
  else {
    return await _getAll();
  }
}

export async function getDsPerformance(id: string) : Promise<DsPerformance|undefined> {
  return await _get(id);
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsPerformance | undefined> => 
      await DataStore.query(DsPerformance, id);

const _getAll = async () : Promise<DsPerformance[]> => 
      (await DataStore.query(DsPerformance)) || [];

const _getMusicPiecePerformances = async (musicPieceId: string) : Promise<DsPerformance[]> => 
      (await DataStore.query(DsPerformance, perfmnce => perfmnce.musicPieceId.eq(musicPieceId))) || [];

const _getCompetitorPerformances = async (competitorId: string) : Promise<DsPerformance[]> => 
  {
    const result = await DataStore.query(DsPerformance, perfmnce => perfmnce.playedBy.eq(competitorId));
    return result || []


  }

