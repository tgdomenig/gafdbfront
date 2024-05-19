
import { DataStore } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'
import { DsConcours, DsConcoursPrize, DsConcoursRound, DsMission, DsParticipation, DsPerformance, DsSession, RepertoirePiece } from '../../../../models';
import { ConcoursInit } from './InitTypes';
import { fGetDsConcours } from '../../ModelsCommon/Concours/ConcoursR';
import { mapAsync, removeDuplicates } from '../../../../util/common/general/collections';
import { sleep } from '../../../../util/web/general/Globals';

export const getConcoursDisplayId = (yearOfConcours: string) => `Concours ${yearOfConcours}`;

export async function saveConcours(input: ConcoursInit) {
  const displayId = getConcoursDisplayId(input.yearOfConcours);
  assertNone(displayId);

  return await DataStore.save(new DsConcours({...input, displayId}));
}

async function assertNone(displayId: string) {
  if (await fGetDsConcours(displayId)) {
    throw new Error("ITC-Error: Concours " + displayId + " already exists in Datastore!");
  }
}

/*
DsConcours has no foreign key to other tables.
The following tables have foreign keys to DsConcours:
- DsConcoursRound
- DsMission
- DsConcoursPrize

The following tables have foreign keys to DsConcoursRound:
- RepertoirePiece
- DsSession
- DsParticipation

The following tables have foreign keys to DsMission:
- DsConcoursPrize
- DsParticipation

The following tables have foreign keys to DsSession:
- DsParticipation

The following tables have foreign keys to DsParticipation:
- DsPerformance

No table has foreign keys to 
- DsConcoursPrize
- RepertoirePiece
*/
export async function deleteConcoursAndDependencies(yearOfConcours: string) {
  const displayId = getConcoursDisplayId(yearOfConcours);
  const dsConcours = await fGetDsConcours(displayId);
  if (dsConcours) {

    const roundsToDelete = await DataStore.query(DsConcoursRound, r => r.concoursId.eq(dsConcours.id));

    let sessionsToDelete : DsSession[] = [];
    let repertoirePiecesToDelete : RepertoirePiece[] = [];
    let participationsToDelete : DsParticipation[] = [];
    let concoursPrizesToDelete : DsConcoursPrize[] = [];
    let performancesToDelete : DsPerformance[] = [];

    for (let {id} of roundsToDelete) {
      const sessions = await DataStore.query(DsSession, p => p.concoursRoundId.eq(id));
      const repPieces = await DataStore.query(RepertoirePiece, p => p.dsConcoursRoundId.eq(id));
      const participations = await DataStore.query(DsParticipation, p => p.concoursRoundId.eq(id));

      sessionsToDelete = sessionsToDelete.concat(sessions);
      repertoirePiecesToDelete = repertoirePiecesToDelete.concat(repPieces);
      participationsToDelete = participationsToDelete.concat(participations);
    }

    const missionsToDelete = await DataStore.query(DsMission, r => r.concoursId.eq(dsConcours.id));

    for (let {id} of missionsToDelete) {
      const mParticipations = await DataStore.query(DsParticipation, p => p.concoursRoundId.eq(id));
      const prizes = await DataStore.query(DsConcoursPrize, p => p.missionId.eq(id));

      concoursPrizesToDelete = concoursPrizesToDelete.concat(prizes);
      participationsToDelete = participationsToDelete.concat(mParticipations);
    }

    sessionsToDelete = removeDuplicates(sessionsToDelete);

    participationsToDelete = removeDuplicates(participationsToDelete);
    for (let {id} of participationsToDelete) {
      const performances = await DataStore.query(DsPerformance, p => p.dsParticipationPerformancesId.eq(id));

      performancesToDelete = performancesToDelete.concat(performances);
    }

    repertoirePiecesToDelete = removeDuplicates(repertoirePiecesToDelete);
    performancesToDelete = removeDuplicates(performancesToDelete);
    concoursPrizesToDelete = removeDuplicates(concoursPrizesToDelete);

    let item;
    console.log("----------------- ROUNDS -----------------")
    for (item of roundsToDelete) {
      console.log(item.displayId);
    }

    console.log("----------------- MISSIONS -----------------")
    for (item of missionsToDelete) {
      console.log(item.displayId);
    }
    console.log("----------------- SESSIONS -----------------")
    for (item of sessionsToDelete) {
      console.log(item.displayId);
    }

    console.log("----------------- REPERTOIRE PIECES -----------------")
    for (item of repertoirePiecesToDelete) {
      console.log(item.id);
    }

    console.log("----------------- PARTICIPATIONS -----------------")
    for (item of participationsToDelete) {
      console.log(item.displayId);
    }

    console.log("----------------- PRIZES -----------------")
    for (item of concoursPrizesToDelete) {
      console.log(item.label);
    }

    console.log("----------------- PERFORMANCES -----------------")
    for (item of performancesToDelete) {
      console.log(item.id);
    }

    /*
    let roundsToDelete : DsConcoursRound[] = [];
    let missionsToDelete : DsMission[] = [];
    let sessionsToDelete : DsSession[] = [];
    let repertoirePiecesToDelete : RepertoirePiece[] = [];
    let participationsToDelete : DsParticipation[] = [];
    let concoursPrizesToDelete : DsConcoursPrize[] = [];
    let performancesToDelete : DsPerformance[] = [];

*/

    for (var repPiece of repertoirePiecesToDelete) {
      await DataStore.delete(repPiece);
    }
    console.log("repertoire pieces deleted")

    await sleep(2000);

    for (var prize of concoursPrizesToDelete) {
      await DataStore.delete(prize);
    }
    console.log(concoursPrizesToDelete.length + " concours prizes deleted")

    await sleep(2000);

    for (var perf of performancesToDelete) {
      await DataStore.delete(perf);
    }
    console.log(performancesToDelete.length + " performances deleted")


    await sleep(2000);

    for (var part of participationsToDelete) {
      await DataStore.delete(part);
    }
    console.log(participationsToDelete.length + " participations deleted");

    await sleep(2000);

    for (var miss of missionsToDelete) {
      await DataStore.delete(miss);
    }
    console.log(missionsToDelete.length + " missions deleted");

    await sleep(2000);

    for (var sess of sessionsToDelete) {
      await DataStore.delete(sess);
    }
    console.log(sessionsToDelete.length + " sessions deleted");

    await sleep(2000);

    for (var round of roundsToDelete) {
      await DataStore.delete(round);
    }
    console.log(roundsToDelete.length + " rounds deleted");


    await sleep(2000);

    await DataStore.delete(dsConcours);
    console.log(`DONE: concours ${yearOfConcours} deleted`);


  }


}