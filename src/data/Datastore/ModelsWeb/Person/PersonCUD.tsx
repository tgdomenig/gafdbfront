
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsGenericItem, DsPerson } from '../../../../models';
import { PersonInit } from './InitTypes';
import { fGetDsPerson } from '../../ModelsCommon/Person/PersonR';
import { fGetDsGenericItem } from '../../ModelsCommon/Generic/GenericR';
import { xGet } from '../Base/xGet';

/* ----------------------------- SAVE ----------------------- */
export async function savePerson(input: PersonInit) : Promise<DsPerson> {
  const {origin, ...rest} = input;

  let countryId = origin && (await xGet<DsGenericItem>(fGetDsGenericItem, origin)).id;

  return await DataStore.save(
    new DsPerson({
      dsPersonOriginId: countryId,
      ...rest})
  );
}

export async function xSavePerson(input: PersonInit) : Promise<DsPerson> {
  await assertNone(input.displayId);
  return await savePerson(input);
}

async function assertNone(displayId: string) {
  // don't use fGet here because it logs a message if displayId is not found
  const recs = await DataStore.query(DsPerson, rec => rec.displayId.eq(displayId))
  if (recs.length > 0) {
    throw new Error("ITC-Error: Person " + displayId + " already exists in Datastore!");
  }
}

/*
DsPerson has no foreign key to other tables.

The following tables have foreign keys to DsPerson:
- DsMission
- PerformedConcert
- DsParticipation

The following tables have foreign keys to DsMission:
DsConcoursPrize

The following tables have foreign keys to DsParticipation:
- DsPerformance

No table has foreign keys to 
- DsConcoursPrize
- PerformedConcert
- DsPerformance

*/
async function deletePersonAndDependencies(displayId: string) {

}


//   const bioPost = await findBioPost(name);

//   const person = await DataStore.save(new DsPerson({
//     name, yearOfBirth, profileImage, 
//     isUnderGafManagement, // gafManagementSort,
//     bioPostId: bioPost && bioPost.id,
//     origin: country,
//     dsPersonOriginId: country && country.id
//   }));

//   for (var missionInput of missions) {
//     saveMission(missionInput, person.id);
//   }

//   for (var prizeInput of prizes) {
//     await saveConcoursPrize(prizeInput, person.id);
//   }

//   return person;
// }

