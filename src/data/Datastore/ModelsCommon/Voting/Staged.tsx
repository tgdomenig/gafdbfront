import { DsVoting } from "../../../../models";
import { LANGUAGE } from "../../../../util/common/language";
import { parseDate } from "../../../../util/common/dateTime/Parse";
import { Voting } from "./Types";
import { fGetDsVoting } from "./VotingR";
import { stageMandatoryLongTextField, stageMandatoryTextField } from "../Base/Staging";

export async function fGetVoting(lg: LANGUAGE, displayId: string) : Promise<Voting|undefined> {
  const dsVoting = await fGetDsVoting(displayId);

  return dsVoting ? stageVoting(lg, dsVoting) : undefined;
}

export function stageVoting(lg: LANGUAGE, dsVoting: DsVoting) : Voting {
  const {id, displayId, title, description, choices, starts, terminates} = dsVoting;

  return {
    id,
    displayId,
    title: stageMandatoryTextField(lg, title),
    description: description ? stageMandatoryLongTextField(lg, description) : undefined,
    choices: choices ? choices.map(choice => stageMandatoryTextField(lg, choice)) : [],
    starts: starts ? parseDate(starts) : undefined,
    terminates: terminates ? parseDate(terminates) : undefined
  }
}