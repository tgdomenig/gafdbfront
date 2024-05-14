import { DataStore } from '@aws-amplify/datastore';
import { DsParticipation, DsConcoursRound, DsPerson } from '../../../../models';
import { assertOneNReturn } from '../Base/Util';
import { xFindMission } from '../Mission/MissionRWeb';
import { fGetDsPerson } from '../../ModelsCommon/Person/PersonR';
import { xGet } from '../Base/xGet';


export async function xFindDsParticipation(round: DsConcoursRound, competitorDisplayId: string): Promise<DsParticipation> {
  const person = await xGet<DsPerson>(fGetDsPerson, competitorDisplayId);
  const mission = await xFindMission(round.concoursId, person.id);
  const recs = (await DataStore.query(DsParticipation, p => p.missionId.eq(mission.id))).filter(p => p.concoursRoundId === round.id);
  return assertOneNReturn<DsParticipation>(
    recs, 
    "Participation mit MissionId " + mission.id,
    "competitorDisplayId: " + competitorDisplayId + ", round: " + round.displayId
  );
}
