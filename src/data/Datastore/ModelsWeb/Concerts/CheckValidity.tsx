import { fGetDsPerson } from "../../ModelsCommon/Person/PersonR";
import { DsConcertInit } from "./InitTypes";


export async function checkValidity(concerts: DsConcertInit[]) {

  for (const concert of concerts) {
    for (const artist of concert.managedArtists) {
      if (! await fGetDsPerson(artist)) {
        throw new Error(`ITC-Error: artist ${artist} not found in db`);
      }
    }
  }
}