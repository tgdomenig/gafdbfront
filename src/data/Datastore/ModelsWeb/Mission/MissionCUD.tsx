
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsConcours, DsMission, DsPerson, DsRole } from '../../../../models';
import { MissionInit } from './InitTypes';
import { xGet } from '../Base/xGet';
import { yGetDsConcours } from '../../ModelsCommon/Concours/ConcoursR';
import { getDsPerson } from '../../ModelsCommon/Person/PersonR';
import { fGetDsMission } from '../../ModelsCommon/Mission/MissionR';
import { getDisplayIdMission } from '../../ModelsCommon/Base/DisplayIds';

export async function saveMission(input: MissionInit, personId: string) : Promise<DsMission> {

  const {yearOfConcours, role} = input;
  const dsPerson = await xGet<DsPerson>(getDsPerson, personId);
  const concours = await xGet<DsConcours>(yGetDsConcours, yearOfConcours);

  const displayId = getDisplayIdMission(dsPerson.displayId, yearOfConcours, role);
  assertNone(displayId);

  return DataStore.save(new DsMission({
    displayId,
    personId: personId,
    concoursId: concours.id,
    ...input
  }));
};

async function assertNone(displayId: string) {
  if (await fGetDsMission(displayId)) {
    throw new Error("ITC-Error: Mission " + displayId + " already exists in Datastore!");
  }
}


