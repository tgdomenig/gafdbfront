import { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";
import { Voting } from "../../data/Datastore/ModelsCommon/Voting/Types";
import { getAllVotes } from "../../data/Datastore/ModelsWeb/Vote/VoteR";

type VoteStats = {
  choice: string,
  nbVotes: number
}

export function RVotingStats({voting}: {voting: Voting}) {

  const [stats, setStats] = useState<VoteStats[]>([]);

  const fetchVotes = async () => {
    if (voting) {
      const actualVotes = await getAllVotes(voting.id);
  
      const actualVotesfake = [
        {choice: "A"},
        {choice: "B"},
        {choice: "A"},
        {choice: "B"},
        {choice: "A"},
        {choice: "C"},
        {choice: "A"},
        {choice: "A"},
        {choice: "C"},
        {choice: "A"},
        {choice: "A"},
        {choice: "C"},
        {choice: "D"},
        {choice: "D"},
        {choice: "C"},
        {choice: "A"},
        {choice: "A"},
        {choice: "C"},
        {choice: "C"}
      ];

      const newStats = new Map<string, number>();
      for (var {choice} of actualVotes) {
        if (choice) {
          const n = newStats.get(choice);
          if (n) {
            newStats.set(choice, n + 1);
          }
          else {
            newStats.set(choice, 1);
          }
        }
      }

      const asArray = Array.from(newStats, ([choice, nbVotes]) => ({choice, nbVotes}));
      asArray.sort((a, b) => a.nbVotes < b.nbVotes ? 1 : -1);

      setStats(asArray);
    }
  }

  return(
    <div>
      {
        (stats && stats.length > 0)
          ? <RStatistics stats={stats} />
          : <div />
      }

      <Button onClick={fetchVotes}>Fetch Votes</Button>
    </div>
  );
}

function RStatistics({stats}: {stats: VoteStats[]}) {
  return(
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      <Descriptions
                    column={1}
                    size="small"
                    bordered={true}
       >
        {stats.map(({choice, nbVotes}: VoteStats, i: number) => {
          return(
            <Descriptions.Item label={choice} >{nbVotes}</Descriptions.Item>
          )
          })}
      </Descriptions>
    </div>
  )
}

