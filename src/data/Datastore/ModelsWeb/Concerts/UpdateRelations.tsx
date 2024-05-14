// import { getDsConcerts } from "../../ModelsCommon/Concerts/ConcertR";
// import { getDsPersons } from "../../ModelsCommon/Person/PersonR";
// import { updateDsConcert } from "./ConcertCUD";


// check and if necessary update relations (in this case managedArtistIds)
export async function updateRelations() {

/*
  console.log("UPDATING RELATIONS START");

  const mgdArtists = await getDsPersons({underGafManagement: true});

  const lookupIdByName = new Map<string, string>(
    mgdArtists.map(({id, name}) => [name, id])
  );

  console.log("LOOKUP: ", lookupIdByName);

  const concerts = await getDsConcerts();

  for (var concert of concerts) {
    const ids = concert.managedArtists?.filter(name => {
      if (lookupIdByName.has(name)) {
        return lookupIdByName.get(name);
      }
      else {
        console.log(`ITC-WARNING: ManagedArtist ${name} not found!`);
      }
    });
    if (concert.managedArtistIds !== ids) {
      console.log("UPDATING CONCERT: ", concert.id);
      await updateDsConcert(concert.id, {managedArtistIds: ids})
    }
  }
  */
}
