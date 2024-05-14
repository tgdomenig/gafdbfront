import { DataStore } from "@aws-amplify/datastore";
import { DsConcours, DsConcoursPrize, DsMission, DsParticipation, DsPerson, DsRole } from "../../../../models";
import { mapAsync } from "../../../../util/common/general/collections";
import { getDsParticipations } from "../../ModelsCommon/Participation/ParticipationR";
import { fGetDsPerson, getDsPerson } from "../../ModelsCommon/Person/PersonR";
import { getDsConcoursPrizes } from "../../ModelsCommon/Prize/PrizesR";
import { assertOneNReturn, sortNReturn } from "../Base/Util";
import { getDsMissions, getDsMissionsProps, getSpecificDsMission } from "../../ModelsCommon/Mission/MissionR";
import { fGetDsConcours, getDsConcours } from "../../ModelsCommon/Concours/ConcoursR";
import { xGet } from "../Base/xGet";

export type MissionsByRole = {[key in DsRole]: DsMission[]};

export async function getDsMissionsByRole(props?: getDsMissionsProps) : Promise<MissionsByRole> {
  const recs = await getDsMissions(props);
  const result = {} as MissionsByRole;
  for (var rec of recs) {
    if (rec.role in result) {
      result[rec.role].push(rec)
    }
    else {
      result[rec.role] = [rec];
    }
  }
  return result;
}

type getDsMissionsXpdProps = getDsMissionsProps & {
  includeDisplayIds?: boolean,
  xpdLevel?: number
}

type DsMissionXpd = DsMission & {
  concoursDisplayId?: string,
  personDisplayId?: string,
  participationsXpd?: DsParticipation[],
  prizesXpd?: DsConcoursPrize[]
}

// expand nodes up to drill-down level; also include displayIds of parents
export async function getDsMissionsXpd(props: getDsMissionsXpdProps) : Promise<DsMissionXpd[]> {

  const {includeDisplayIds, xpdLevel} = props || {};

  let recs = await getDsMissions(props) as DsMissionXpd[];

  if (includeDisplayIds || (xpdLevel && xpdLevel > 0)) {

    recs = await mapAsync(async (rec: DsMission) => {
      const {concoursId, personId, id} = rec;
      let concoursDisplayId, personDisplayId, prizesXpd, participationsXpd;
      if (includeDisplayIds) {
        concoursDisplayId = (await xGet<DsConcours>(getDsConcours, concoursId)).displayId;
        personDisplayId = (await xGet<DsPerson>(getDsPerson, personId)).displayId;
      }
      if (xpdLevel && xpdLevel > 0) {
        prizesXpd = await getDsConcoursPrizes({missionId: id});
        participationsXpd = await getDsParticipations({missionId: id});
      }
      return({
          concoursDisplayId, 
          personDisplayId, 
          prizesXpd,
          participationsXpd,
          ...rec
        })
    }, recs);
  }
  return sortNReturn(recs);
}

type xfGetDsMissionsProps = {
  personDisplayId?: string,
  concoursDisplayId?: string
}

// this one works on displayIds
export async function xfGetDsMissions(props: xfGetDsMissionsProps) : Promise<DsMission[]> {
  const {personId, concoursId} = await _displayId2Id(props);
  return await getDsMissions({personId, concoursId});
}

type xfGetDsMissionsXpdProps = xfGetDsMissionsProps & {
  includeDisplayIds?: boolean,
  xpdLevel?: number
}

export async function xfGetDsMissionsXpd(props: xfGetDsMissionsXpdProps) : Promise<DsMissionXpd[]> {
  const {personId, concoursId} = await _displayId2Id(props);
  return await getDsMissionsXpd({personId, concoursId, ...props});
}

async function _displayId2Id({personDisplayId, concoursDisplayId}: xfGetDsMissionsProps) {
  let personId, concoursId;
  if (personDisplayId) {
    personId = (await xGet<DsPerson>(fGetDsPerson, personDisplayId)).id;
  }
  if (concoursDisplayId) {
    const concours = await xGet<DsConcours>(fGetDsConcours, concoursDisplayId);
    concoursId = concours.id;
  }
  return {personId, concoursId};
}

/*

export async function getDsMissions(personId: string) : Promise<DsMission[]> {
  const recs = (await DataStore.query(DsMission)).filter(m => m.personId === personId);
  return sortNReturn(recs);
}

export async function getDsConcoursMissions(concoursId: string) : Promise<DsMission[]> {
//  const recs = (await DataStore.query(DsMission)).filter(m => m.concoursId === concoursId);
  const recs = await DataStore.query(DsMission, m => m.concoursId.eq(concoursId));
  return sortNReturn(recs);
}
*/

export async function xFindMission(concoursId: string, personId: string) {
  const recs = (await DataStore.query(DsMission, (m) => m.personId.eq(personId))).filter(m => m.concoursId === concoursId);
  const concours = await getDsConcours(concoursId);
  const person = await getDsPerson(personId);
  return assertOneNReturn<DsMission>(recs, "Mission with year of concours = " + concours?.yearOfConcours + " and Person name = " + person?.name);
}

export async function yGetDsMission(personDisplayId: string, concoursDisplayId: string, role: DsRole) {

  const dsPerson = await xGet(fGetDsPerson, personDisplayId);
  const dsConcours = await xGet(fGetDsConcours, concoursDisplayId);

  return await getSpecificDsMission(dsPerson.id, dsConcours.id, role);  
}