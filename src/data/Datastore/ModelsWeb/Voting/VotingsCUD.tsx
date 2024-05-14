import { DataStore, Predicates } from "@aws-amplify/datastore";
import { DsVoting } from "../../../../models";
import { VotingInit } from "./InitTypes";

export async function saveVoting(input: VotingInit) : Promise<DsVoting> {
  return await DataStore.save(new DsVoting(input));
};
