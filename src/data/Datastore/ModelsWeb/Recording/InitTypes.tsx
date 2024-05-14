import { TextInit } from "../Base/InitTypes"

export type RecordingInit = {
  musicPieceId: string,
  mainPerformer: string,
  orchestra: TextInit,
  conductor: string,
  otherParticipants: TextInit[],
  recordingLocation: TextInit,
  recordingDate: string,
  liveRecording: boolean
}

export type AlbumInit = {
  album: string,
  release:  "First Release" | "Re-release" | "Parallel release"
}
