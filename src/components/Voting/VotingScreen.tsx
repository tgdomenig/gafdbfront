import { useEffect, useState } from "react";
import { PageTitle } from "../Base/Base";
import { DsVoting } from "../../models";
import { fGetDsVoting } from "../../data/Datastore/ModelsCommon/Voting/VotingR";
import { ENGLISH } from "../../util/common/language";
import { stageVoting } from "../../data/Datastore/ModelsCommon/Voting/Staged";
import { Voting } from "../../data/Datastore/ModelsCommon/Voting/Types";
import { xGetStaged } from "../../data/Datastore/ModelsCommon/Base/xGetStaged";
import { RVotingStats } from "./RVotingStats";
import { VotingTimeWindowEditor } from "./VotingTimeWindowEditor";

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

      console.log("voting", voting)


      // export async function xGetStaged<S, T>(
      //   lg: LANGUAGE, 
      //   getter: (idOrDisplayId: string) => Promise<S|undefined>,
      //   idOrDisplayId: string,
      //   stager: (lg: LANGUAGE, dsRec: S) => T | Promise<T>
      // ) : Promise<T|undefined> {
      

      // const voting1 = await fGetDsVoting(_DISPLAY_ID_);
      if (voting) {
        setVoting(voting);
      }
    }

    load();
  },
  []);

  return(
    <div>
      <PageTitle title="Voting" />

      {voting ? <VotingTimeWindowEditor voting={voting} /> : <div />}

      {voting ? <RVotingStats voting={voting} /> : <div />}

    </div>
  );
}

