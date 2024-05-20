import { format } from "date-fns";
import { getDsParticipations } from "../../data/Datastore/ModelsCommon/Participation/ParticipationR";
import { fGetDsConcoursRound } from "../../data/Datastore/ModelsCommon/Round/RoundR";
import { DsParticipation } from "../../models";

export const RoundDisplayIds = [
  "Concours 2024: Round One",
  "Concours 2024: Round Two",
  "Concours 2024: Round Three",
  "Concours 2024: Round Four"
]

export type RoundDisplayIdType = 
"Concours 2024: Round One" |
"Concours 2024: Round Two" |
"Concours 2024: Round Three" |
"Concours 2024: Round Four";

export function getPreviousRoundDid(roundDid: RoundDisplayIdType) : typeof RoundDisplayIds[number] | ""  {
  const ix = RoundDisplayIds.findIndex(el => el === roundDid);
  return ix > 0 ? RoundDisplayIds[ix-1] : ""
}

/**
 * Get participations of previous round 
 * Note: all candidates participate in the first round, so the eligible competitors for the first round are just the current competitors 
 */
export async function getEligibleCompetitors(roundDid: RoundDisplayIdType): Promise<DsParticipation[]> {
  return await getCompetitors(roundDid === RoundDisplayIds[0] ? roundDid : getPreviousRoundDid(roundDid));
}

/**
 * Get participations of current round
 */
export async function getCompetitors(roundDid: typeof RoundDisplayIds[number]): Promise<DsParticipation[]> {

  const round = await fGetDsConcoursRound(roundDid);
  if (round) {
    return await getDsParticipations({ concoursRoundId: round.id });
  }
  else {
    return [];
  }
}

export const competitor2CandidateDid = (competitorDid: string) : string => {
  const parts = competitorDid.split('|');
  if (parts.length === 2) {
    return parts[1];
  }
  else {
    throw new Error("ITC ERROR [competitor2CandidateDid]: something wrong!!")
  }
}

export const getCandidateName = (candidateDid: string) : string => {
  const start = 'C24 CAND: '.length;
  return candidateDid.substring(start);
}

export const toDateStr = (date: string | Date | null | undefined) => 
  date ? (typeof date === 'string') ? date : format(date, 'dd.MM.yyyy') : ""

export const toTimeStr = (date: string | Date | null | undefined) => 
  date ? (typeof date === 'string') ? date : format(date, 'hh:mm') : ""

export const todayAt = (hour: number) : Date => {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, 0, 0, 0);
}