import { getDsUsers } from "../../ModelsCommon/User/UserR";


type ActualVote = {userId: string, choice: string};

export async function getAllVotes(votingId: string) : Promise<ActualVote[]> {
  const allUsers = await getDsUsers();
  return allUsers.map(user => {
    if (user.votes && user.votes.length > 0) {
      const ix = user.votes.findIndex(vote => vote.votingId === votingId);
      if (ix > -1) {
        const {choice} = user.votes[ix];
        return {userId: user.deviceId, choice};
      }
    }
  }).filter(el => (!! el)) as ActualVote[];
}