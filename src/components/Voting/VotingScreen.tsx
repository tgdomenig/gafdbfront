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

import { Card } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

import '../../App.css'

const _DISPLAY_ID_ = "Voting Publikumspreis 2024";

type VoteStats = {
  choice: string,
  nbVotes: number
}

export function VotingScreen() {
  return <VotingScreenHelper displayId={_DISPLAY_ID_} />
}

export function VotingScreenHelper({displayId}: {displayId: string}) {

  const [voting, setVoting] = useState<Voting|undefined>(undefined);

  useEffect(() => {
    const load = async () => {

      const voting = await xGetStaged<DsVoting, Voting>(ENGLISH, fGetDsVoting, displayId, stageVoting);

      if (voting) {
        setVoting(voting);
      }
    }

    load();
  },
  []);

  const onSubmitTimeWindow = async (starts: Date, durationInMinutes: number) => {

    if (voting) {

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

        <Card className="warning-card"
          style={{marginBottom: 20, color: 'red', textEmphasisColor: 'red'}}
      >
        <Meta
                  style={{color: 'blue', textEmphasisColor: 'blue'}}
      avatar={<WarningOutlined />}
      title="Note"
      description={"Specify start and end time in Zurich summer time, i.e. GMT plus 2 hours!"}
    />

      </Card>



      {voting ? <VotingTimeWindowEditor voting={voting} onSubmitTimeWindow={onSubmitTimeWindow} /> : <div />}

      {voting ? <RVotingStats voting={voting} /> : <div />}

    </div>
  );
}

