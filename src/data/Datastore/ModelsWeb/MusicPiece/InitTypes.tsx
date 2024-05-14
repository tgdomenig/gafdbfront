import { DsParticipation, LazyDsConcoursRound, LazyDsMusicPiece } from "../../../../models";
import { TextInit } from "../Base/InitTypes";

export type MusicPieceInit = {
  displayId: string,
  discographyId?: string,
  composer: string,
  opus?: string,
  displayName: TextInit,
  constituents?: MPConstituentInit[] // full form or short form
}

export type MusicPieceRawInit = {
  displayId: string,
  discographyId?: string,
  composer: string,
  opus?: string,
  displayName: TextInit,
  constituents?: (MPConstituentInit | string)[] // full form or short form
}

export type MPConstituentInit = {
  displayId: string,
  displayName: TextInit
}

export type RepertoirePieceInit = {
  dsConcoursRound: LazyDsConcoursRound,
  dsMusicPiece: LazyDsMusicPiece
}

export type ChosenPieceRawInit = {
  dsCompetitor: DsParticipation,
  piece: MusicPieceInit
}
export type ChosenPieceInit = {
  dsCompetitor: DsParticipation,
  dsMusicPiece: LazyDsMusicPiece
}
