
export type Voting = {
  id: string,
  displayId: string
  title: string
  description?: string[]
  choices: string[]
  starts?: Date
  terminates?: Date
}

