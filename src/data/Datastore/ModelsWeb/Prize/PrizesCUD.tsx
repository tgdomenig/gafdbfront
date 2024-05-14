
import { DataStore } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsConcours, DsConcoursPrize, DsMission } from '../../../../models';
import { ConcoursPrizeInit } from './InitTypes';
import { xGet } from '../Base/xGet';
import { fGetDsConcours } from '../../ModelsCommon/Concours/ConcoursR';
import { getConcoursDisplayId } from '../Concours/ConcoursCUD';

export async function saveConcoursPrize(input: ConcoursPrizeInit, mission: DsMission) : Promise<DsConcoursPrize> {
  const {label, sort} = input;
  const displayId = getConcoursDisplayId(mission.yearOfConcours);
  const concours = await xGet<DsConcours>(fGetDsConcours, displayId);
  return await DataStore.save(new DsConcoursPrize({
    label,
    concoursId: concours.id,
    missionId: mission.id,
    sort
  }));
};
