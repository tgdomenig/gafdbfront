
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'
import { DsConcours } from '../../../../models';
import { chooseFirst } from "../../../../util/common/general/collections";


/* ----------------------------- GET ----------------------- */
export async function getAllDsConcours() {
  return await _getAll();
}

export async function getDsConcours(concoursId: string) : Promise<DsConcours|undefined> {
  return await _get(concoursId);
}

export async function fGetDsConcours(displayId: string) {
  return await _fGet(displayId);
}

export async function yGetDsConcours(yearOfConcours: string) {
  return await _fGet('Concours ' + yearOfConcours);
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsConcours | undefined> => 
      await DataStore.query(DsConcours, id);

const _fGet = async (displayId: string) : Promise<DsConcours | undefined> => 
      chooseFirst(await DataStore.query(DsConcours, rec => rec.displayId.eq(displayId)), displayId);

const _getAll = async () : Promise<DsConcours[]> => 
      await DataStore.query(DsConcours);
