import { LongTextInit, TextInit } from "../Base/InitTypes";

export type VotingInit = {
  displayId: string
  title: TextInit
  description?: LongTextInit
  choices: TextInit[]
  starts?: string
  terminates?: string
}

