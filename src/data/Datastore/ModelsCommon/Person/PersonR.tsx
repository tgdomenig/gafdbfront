
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsMission, DsPerson, DsRole } from '../../../../models';
import { chooseFirst, filteredMapAsync, mapAsync, removeDuplicates } from "../../../../util/common/general/collections";
import { getDsMission, getDsMissions } from '../Mission/MissionR';
import { sortNReturn } from '../Base/Util';

/* ----------------------------- GET ----------------------- */
export type getDsPersonsProps = {
  concoursId?: string,
  role?: DsRole
}

export async function getDsPersons({ concoursId, role }: getDsPersonsProps): Promise<DsPerson[]> {
  let dsPersons: DsPerson[];
  if (concoursId || role) {

    let personIds = (await getDsMissions({ concoursId, role })).map(m => m.personId);
    // es kann Duplikate geben (z. Bsp. wenn jemand sowohl Jury als auch Screening-Jury ist)
    personIds = removeDuplicates(personIds);

    dsPersons = (await filteredMapAsync<string, DsPerson>(async (id: string | undefined) => {
      return id ? await _get(id) : undefined;
    }, personIds));    
  }
  else {
    dsPersons = await _getAll();
  }
  return dsPersons;
}

export async function getDsCandidates(concoursId: string): Promise<DsPerson[]> {

  const dsMissions = await getDsMissions({ concoursId, role: DsRole.CANDIDATE });

  const dsPersons = await filteredMapAsync<DsMission, DsPerson>(
    async (m: DsMission) => _get(m.personId),
    dsMissions);

    return dsPersons;
}

/*
NOTE: DsPerson has no sort field. Sorting happens usually in getDsMissions. 
In the underGafManagement case, the sorting is done explicitly, see below.
*/
export async function getDsArtistsUnderManagement() {
  const dsPersons = await DataStore.query(DsPerson, p => p.isUnderGafManagement.eq(true));
  return await _sortPrizeWinner(dsPersons);
}


async function _sortPrizeWinner(pp: DsPerson[]) : Promise<DsPerson[]> {
  const sortablePersons = await filteredMapAsync<DsPerson, {sort: number, dsPerson: DsPerson}>(
      async (p: DsPerson) => {
        const missions = await getDsMissions({personId: p.id});
        if (missions && missions.length > 0) {
          const mission = chooseFirst(missions); // This is a Hack; we just know that there is never more then one mission for managed prize winners
          if (mission) {
            return {sort: mission.sort, dsPerson: p}
          }
        }
      },
    pp
  );
  const sorted = sortNReturn(sortablePersons);
  return sorted.map(s => s.dsPerson);
}

export async function getAllDsPersons() : Promise<DsPerson[]> {
  return await _getAll();
}

export async function getDsPerson(id: string) : Promise<DsPerson|undefined> {
  return await _get(id);
}

export async function fGetDsPerson(displayId: string): Promise<DsPerson | undefined> {
  return await _fGet(displayId);
}

export async function yGetDsPerson(missionId: string) : Promise<DsPerson | undefined> {
  const dsMission = await getDsMission(missionId);
  if (dsMission) {
    return await getDsPerson(dsMission?.personId);
  }
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsPerson | undefined> => 
      id ? await DataStore.query(DsPerson, id) : undefined;

const _fGet = async (displayId: string) : Promise<DsPerson | undefined> => 
      displayId ? chooseFirst(await DataStore.query(DsPerson, rec => rec.displayId.eq(displayId)), displayId) : undefined;

const _getAll = async () : Promise<DsPerson[]> => 
      await DataStore.query(DsPerson);

