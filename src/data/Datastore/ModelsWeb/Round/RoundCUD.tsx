
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsConcoursRound, RepertoirePiece } from '../../../../models';
import { ConcoursRoundInit } from '../Concours/InitTypes';
import { RepertoirePieceInit } from '../MusicPiece/InitTypes';

/* ----------------------------- SAVE ----------------------- */

export async function saveConcoursRound(input: ConcoursRoundInit) {
  return await DataStore.save(new DsConcoursRound(input));
}

export async function saveRepertoirePiece(input: RepertoirePieceInit) : Promise<RepertoirePiece|undefined> {
  return await DataStore.save(new RepertoirePiece(input));
}






