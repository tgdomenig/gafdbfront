import { DataStore } from "@aws-amplify/datastore";
import { DsVote } from "../../../../models";


export async function getAllVotes(votingId: string) : Promise<DsVote[]> {

  return await DataStore.query(DsVote, v => v.votingId.eq(votingId));

}