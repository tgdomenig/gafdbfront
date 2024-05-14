import { DataStore } from "@aws-amplify/datastore";
import { DsMusicAlbum, DsRecording, RecordingOnAlbum } from "../../../../models";
import { AlbumInit, RecordingInit } from "./InitTypes";
import { fGetAlbum } from "./RecordingRWeb";

export async function saveRecording(recordingInit: RecordingInit) : Promise<DsRecording> {
  return await DataStore.save(new DsRecording(recordingInit));
}

export async function saveRecordingOnAlbum(dsRecording: DsRecording, albumInit: AlbumInit) {
  let dsMusicAlbum = await fGetAlbum(albumInit.album);
  if (! dsMusicAlbum) {
    dsMusicAlbum = await DataStore.save(new DsMusicAlbum(albumInit));
  }
  return await DataStore.save(new RecordingOnAlbum({dsRecording, dsMusicAlbum}));
}


/*

export async function saveChosenPiece(participation: DsParticipation, pieceDisplayId: string) : Promise<ChosenPiece> {


  return await DataStore.save(new ChosenPiece({dsParticipation: participation, dsMusicPiece: mp}));
}
export type RecordingData = {
  displayId: string,
  discographyId: string,
  composer: string,
  displayName: TextInit,
  orchestra: TextInit,
  conductor: string,
  otherParticipants: TextInit[],
  recordingLocation: TextInit,
  recordingDate: string,
  onAlbums: AlbumInit[]
}


*/