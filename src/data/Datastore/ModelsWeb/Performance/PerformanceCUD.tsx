
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsMusicPiece, DsParticipation, DsPerformance } from '../../../../models';
import { PerformanceInit } from './InitTypes';
import { xGet } from '../Base/xGet';
import { fGetDsMusicPiece } from '../../ModelsCommon/MusicPiece/MusicPieceR';

export async function savePerformance(participation: DsParticipation, input: PerformanceInit) : Promise<DsPerformance> {
  const mp = await xGet<DsMusicPiece>(fGetDsMusicPiece, input.piece);
  

  return await saveDsPerformace({
    playedBy: participation.id,
    musicPieceId: mp.id,
    ...input
  });
}

export type DsPerformanceInit = PerformanceInit & {
  id?: string,
  playedBy: string,
  musicPieceId: string
}

export async function saveDsPerformace(input: DsPerformanceInit) : Promise<DsPerformance> {
  return await DataStore.save(new DsPerformance(input));
}

