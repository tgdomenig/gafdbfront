
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import '@azure/core-asynciterator-polyfill'

// import {isFalseOrEmpty, mapAsync} from '../../util/common/general/base';

import { DsMission, DsRole } from '../../../../models';
import { sortNReturn } from '../Base/Util';
import { chooseFirst } from '../../../../util/common/general/collections';
import { itcAssert } from '../../../../util/common/general/tests';

export type getDsMissionsProps = {
  personId?: string,
  concoursId?: string,
  role?: keyof typeof DsRole
}

export async function getDsMissions(props?: getDsMissionsProps) : Promise<DsMission[]> {

  const {personId, concoursId, role} = props || {};

  let missions: DsMission[];
  if (personId && concoursId) {
    missions = await _getConcoursPersonMissions(concoursId, personId);
  }
  else if (personId) {
    missions = await _getPersonMissions(personId);
  }
  else if (concoursId) {
    missions = await _getConcoursMissions(concoursId);
  }
  else {
    missions = await _getAll();
  }

  if (role) {
    missions = missions.filter((m: DsMission) => m.role === role);
  }
  
  return sortNReturn(missions);
}

export async function getDsMission(id: string) : Promise<DsMission|undefined> {
  return await _get(id);
}

export async function fGetDsMission(displayId: string) : Promise<DsMission|undefined> {
  return await _fGet(displayId);
}

export async function getSpecificDsMission(personId: string, concoursId: string, role: DsRole) : Promise<DsMission|undefined> {

  const missions = (await _getConcoursPersonMissions(concoursId, personId)).filter(m => m.role === role);

  return chooseFirst(missions, `mission of ${personId} at concours ${concoursId} with role ${role}`);
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsMission | undefined> => 
      await DataStore.query(DsMission, id);

const _fGet = async (displayId: string) : Promise<DsMission | undefined> => 
  chooseFirst(await DataStore.query(DsMission, rec => rec.displayId.eq(displayId)), displayId);

const _getAll = async () : Promise<DsMission[]> => 
      await DataStore.query(DsMission);

const _getPersonMissions = async (personId: string) : Promise<DsMission[]> =>
      await DataStore.query(DsMission, msn => msn.personId.eq(personId));

const _getConcoursMissions = async (concoursId: string) : Promise<DsMission[]> =>
      await DataStore.query(DsMission, msn => msn.concoursId.eq(concoursId));

const _getConcoursPersonMissions = async (concoursId: string, personId: string) : Promise<DsMission[]> =>
      await DataStore.query(DsMission, msn => msn.and(m => [m.concoursId.eq(concoursId), m.personId.eq(personId)]));


