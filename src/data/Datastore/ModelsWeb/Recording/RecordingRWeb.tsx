import { DataStore } from "@aws-amplify/datastore";
import { DsMusicAlbum } from "../../../../models";


export async function fGetAlbum(name: string) : Promise<DsMusicAlbum|undefined> {
  const recs = await DataStore.query(DsMusicAlbum, album => album.album.eq(name));
  if (recs && recs.length > 0) {
    return recs[0];
  }
}