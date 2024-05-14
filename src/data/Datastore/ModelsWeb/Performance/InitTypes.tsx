import { VideoLinkInit } from "../../ModelsCommon/Performance/Types"

export type PerformanceInit = {
  displayId: string,
  piece: string,
  constituents?: PerformedConstituentInit[],
  videoLink?: VideoLinkInit
}

export type PerformedConstituentInit = {
  displayId: string
  videoLink?: VideoLinkInit
}

/*
type DsPerformance_NEW @model
  @aws_cognito_user_pools 
  @auth(
    rules: [
      { allow: groups, groups: ["Admin"], operations: [create, delete, read, update] }
      { allow: public, operations: [read] }
    ]
  )
{
  musicPieceId: ID! @index(name: "byMusicPiece")
  constituents: [DsPerformedConstituent!]
  playedBy: ID! @index(name: "byCompetitor")
  link: String
}

*/