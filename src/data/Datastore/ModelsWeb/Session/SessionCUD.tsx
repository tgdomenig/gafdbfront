
import { DataStore } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsSession } from '../../../../models';
import { SessionInit } from './InitTypes';
import { fGetDsConcoursRound } from '../../ModelsCommon/Round/RoundR';
import { xGet } from '../Base/xGet';
import { fGetDsSession } from '../../ModelsCommon/Session/SessionR';
import { getDisplayIdSession } from '../../ModelsCommon/Base/DisplayIds';

/* ----------------------------- SAVE / UPDATE ----------------------- */
export async function saveSession(input: SessionInit) : Promise<DsSession> {
  const {concoursRoundDisplayId, sessionName} = input;
  const round = await xGet(fGetDsConcoursRound, concoursRoundDisplayId);

  const displayId = getDisplayIdSession(concoursRoundDisplayId, sessionName);
  assertNone(displayId);

  return await DataStore.save(new DsSession({
    ...input,
    displayId,
    concoursRoundId: round.id
  }));
}

async function assertNone(displayId: string) {
  if (await fGetDsSession(displayId)) {
    throw new Error("ITC-Error: Session " + displayId + " already exists in Datastore!");
  }
}


