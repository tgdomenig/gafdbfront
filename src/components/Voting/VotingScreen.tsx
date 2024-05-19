import { useEffect, useState } from "react";
import { PageTitle } from "../Base/Base";
import { DsVoting } from "../../models";
import { fGetDsVoting, getDsVoting } from "../../data/Datastore/ModelsCommon/Voting/VotingR";
import { ENGLISH } from "../../util/common/language";
import { stageVoting } from "../../data/Datastore/ModelsCommon/Voting/Staged";
import { Voting } from "../../data/Datastore/ModelsCommon/Voting/Types";
import { xGetStaged } from "../../data/Datastore/ModelsCommon/Base/xGetStaged";
import { RVotingStats } from "./RVotingStats";
import { VotingTimeWindowEditor } from "./VotingTimeWindowEditor";
import { VotingInit } from "../../data/Datastore/ModelsWeb/Voting/InitTypes";
import { xUpdate } from "../../data/Datastore/ModelsWeb/Base/xUpdate";
import { addMinutes, formatISO } from "date-fns";

import { Lambda } from "@aws-sdk/client-lambda";

const _DISPLAY_ID_ = "Voting Publikumspreis 2024";

type VoteStats = {
  choice: string,
  nbVotes: number
}

export function VotingScreen() {

  const [voting, setVoting] = useState<Voting|undefined>(undefined);

  useEffect(() => {
    const load = async () => {

      const voting = await xGetStaged<DsVoting, Voting>(ENGLISH, fGetDsVoting, _DISPLAY_ID_, stageVoting);

      if (voting) {
        setVoting(voting);
      }
    }

    load();
  },
  []);

  const onSubmitTimeWindow = async (starts: Date, durationInMinutes: number) => {

    if (voting) {
      const endDateTime = addMinutes(starts, durationInMinutes);

      const updated = await xUpdate<VotingInit, DsVoting>(
        getDsVoting,
        DsVoting.copyOf,
        voting.id,
        {
          starts: formatISO(starts),
          terminates: formatISO(addMinutes(starts, durationInMinutes))
        }
      );
      if (updated) {
        setVoting(stageVoting(ENGLISH, updated));
        return true;
      }
    }
    return false;
  }

  return(
    <div>
      <PageTitle title="Voting" />

      {voting ? <VotingTimeWindowEditor voting={voting} onSubmitTimeWindow={onSubmitTimeWindow} /> : <div />}

      
      {voting ? <RVotingStats voting={voting} /> : <div />}

    </div>
  );
}

