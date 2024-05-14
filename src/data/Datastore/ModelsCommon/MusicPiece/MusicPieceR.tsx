
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsMusicPiece } from '../../../../models';
import { chooseFirst } from '../../../../util/common/general/collections';

export async function getDsMusicPiece(id: string) : Promise<DsMusicPiece|undefined> {
  return await _get(id);
}

export async function fGetDsMusicPiece(displayId: string) : Promise<DsMusicPiece|undefined> {
  return await _fGet(displayId);
}

export async function getDsMusicPieces() : Promise<DsMusicPiece[]> {
  return await _getAll();
}

export async function getDSChosenPieces(competitorId: string): Promise<DsMusicPiece[]> {
  return await _getCompetitorPieces(competitorId);
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsMusicPiece | undefined> => 
      await DataStore.query(DsMusicPiece, id);
      
const _fGet = async (displayId: string) : Promise<DsMusicPiece | undefined> => 
      chooseFirst(await DataStore.query(DsMusicPiece, rec => rec.displayId.eq(displayId)), displayId);

const _getCompetitorPieces = async (competitorId: string): Promise<DsMusicPiece[]> =>
      await DataStore.query(DsMusicPiece, rec => rec.chosenBy.dsParticipation.id.eq(competitorId));

const _getAll = async () : Promise<DsMusicPiece[]> => 
      await DataStore.query(DsMusicPiece);
