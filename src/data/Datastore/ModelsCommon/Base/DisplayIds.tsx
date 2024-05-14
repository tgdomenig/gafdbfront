import { DsRole } from "../../../../models";


export function getDisplayIdParticipation(concoursRoundDisplayId: string, personDisplayId: string) : string {
  return [concoursRoundDisplayId, personDisplayId].join("|");
}

export function getDisplayIdMission(personDisplayId: string, yearOfConcours: string, role: DsRole) : string {
  return [`C${yearOfConcours}`, personDisplayId, role].join("|");
}

export function getDisplayIdSession(concoursRoundDisplayId: string, sessionName: string) : string {
  return [concoursRoundDisplayId, sessionName].join("|");
}
