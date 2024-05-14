
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsConcoursRound, DsMusicPiece } from '../../../../models';
import { chooseFirst } from "../../../../util/common/general/collections";

export async function getAllDsConcoursRounds() : Promise<DsConcoursRound[]> {
  return await _getAll();
}

export async function getDsConcoursRound(id: string) : Promise<DsConcoursRound|undefined> {
  return await _get(id);
}

export async function fGetDsConcoursRound(displayId: string) : Promise<DsConcoursRound | undefined> {
  return await _fGet(displayId);
}

async function getDSRepertoirePieces(roundId: string) : Promise<DsMusicPiece[]> {
  return await DataStore.query(DsMusicPiece, (piece) => piece.inRepertoires.dsConcoursRound.id.eq(roundId));
}

export async function fGetDSRepertoirePieces(roundDisplayId: string) : Promise<DsMusicPiece[]> {
  const round = await fGetDsConcoursRound(roundDisplayId);
  return (round) ? await getDSRepertoirePieces(round.id) : [];
}


/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsConcoursRound | undefined> => 
      await DataStore.query(DsConcoursRound, id);

const _fGet = async (displayId: string) : Promise<DsConcoursRound | undefined> => 
      chooseFirst(await DataStore.query(DsConcoursRound, rec => rec.displayId.eq(displayId)), displayId);

const _getAll = async () : Promise<DsConcoursRound[]> => 
      await DataStore.query(DsConcoursRound);
