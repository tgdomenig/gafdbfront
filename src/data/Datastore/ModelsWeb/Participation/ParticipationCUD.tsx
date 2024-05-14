
import { DataStore } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { ChosenPiece, DsConcoursRound, DsMission, DsMusicPiece, DsParticipation, DsPerson } from '../../../../models';
import { xGet } from '../Base/xGet';
import { fGetDsMusicPiece } from '../../ModelsCommon/MusicPiece/MusicPieceR';
import { getDsPerson } from '../../ModelsCommon/Person/PersonR';
import { fGetDsParticipation } from '../../ModelsCommon/Participation/ParticipationR';
import { getDisplayIdParticipation } from '../../ModelsCommon/Base/DisplayIds';


export async function saveDsParticipation(mission: DsMission, round: DsConcoursRound) : Promise<DsParticipation> {

  const dsPerson = await xGet<DsPerson>(getDsPerson, mission.personId);
  const displayId = getDisplayIdParticipation(round.displayId, dsPerson.displayId);
  assertNone(displayId);

  return await DataStore.save(new DsParticipation({
    displayId,
    missionId: mission.id, 
    concoursRoundId: round.id
  }));
}

export async function saveChosenPiece(participation: DsParticipation, pieceDisplayId: string) : Promise<ChosenPiece> {
  const mp = await xGet<DsMusicPiece>(fGetDsMusicPiece, pieceDisplayId);
  return await DataStore.save(new ChosenPiece({dsParticipation: participation, dsMusicPiece: mp}));
}

async function assertNone(displayId: string) {
  if (await fGetDsParticipation(displayId)) {
    throw new Error("ITC-Error: Participation " + displayId + " already exists in Datastore!");
  }
}
