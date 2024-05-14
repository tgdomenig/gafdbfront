import { DataStore } from "@aws-amplify/datastore";
import { DsMusicAlbum, DsRecording, RecordingOnAlbum } from "../../../../models";
import { mapAsync } from "../../../../util/common/general/collections";

export type dsRecordingsProps = {
  musicPieceId?: string
}

export async function getDsRecordings(props?: dsRecordingsProps) : Promise<DsRecording[]> {
  const {musicPieceId} = props || {};

  if (musicPieceId) {
    return await _getMusicPiece(musicPieceId);
  }
  else {
    return await _getAll();
  }
}

export async function getDsRecording(id: string) : Promise<DsRecording|undefined> {
  return await _get(id);
}

export async function getRecordingOnAlbums(dsRecording: DsRecording) : Promise<DsMusicAlbum[]> {
  /// THIS DOES NOT WORK !!!!!  const recordingOnAlbums = await dsRecording.onAlbums.toArray();
  // HACK !!!!!

  const recordingOnAlbums = await DataStore.query(RecordingOnAlbum, r => r.dsRecordingId.eq(dsRecording.id))
  
  return await mapAsync(async (rec: RecordingOnAlbum) => await rec.dsMusicAlbum, recordingOnAlbums);
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsRecording | undefined> => 
      await DataStore.query(DsRecording, id);

const _getAll = async () : Promise<DsRecording[]> => 
      await DataStore.query(DsRecording);

const _getMusicPiece = async (musicPieceId: string) : Promise<DsRecording[]> => 
      await DataStore.query(DsRecording, rec => rec.musicPieceId.eq(musicPieceId));


