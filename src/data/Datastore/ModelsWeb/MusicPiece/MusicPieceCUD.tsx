
import { DataStore } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsMusicPiece } from '../../../../models';
import { MPConstituentInit, MusicPieceInit, MusicPieceRawInit } from './InitTypes';
import { xGet } from '../Base/xGet';
import { fGetDsMusicPiece } from '../../ModelsCommon/MusicPiece/MusicPieceR';

export async function saveMusicPiece(input: MusicPieceRawInit) {

  const {constituents: rawConstituents} = input;

  let constituents = [] as MPConstituentInit[];
  if (rawConstituents) {
    constituents = rawConstituents.map(c => 
      (typeof c === 'string')
        ?
          {
            displayId: c,
            displayName: {en_US: c, fr_FR: c, de_DE: c}
          }
        : c
      );
  }

  return await DataStore.save(new DsMusicPiece({...input, constituents} as MusicPieceInit));
}


/* 
Datastore structure:
{
  displayId: String!
  discographyId: String
  composer: String
  displayName: TextField!
  opus: String
  constituents: [DsMPConstituent]
  inRepertoires: [DsConcoursRound!] @manyToMany(relationName: "RepertoirePiece")
  chosenBy: [DsParticipation!] @manyToMany(relationName: "ChosenPiece")
  performances: [DsPerformance!] @hasMany(indexName: "byMusicPiece")
  recordings: [DsRecording!] @hasMany(indexName: "Recording")
}

*/

// export type MusicPieceUpdateInit = MusicPieceInit & { newDisplayId: string };

// export async function updateMusicPiece(props: Partial<MusicPieceUpdateInit>) : Promise<DsMusicPiece|undefined> {

//   const {displayId, newDisplayId, ...input} = props;
//   if (displayId) {
//     let original = await xGet<DsMusicPiece>(fGetDsMusicPiece, displayId);

//     const f = DsMusicPiece.copyOf

//     if (original) {
//       const result = await DataStore.save(DsMusicPiece.copyOf(
//         original,
//         updated => {
//           if (newDisplayId) {
//             updated['displayId'] = newDisplayId;
//           }
//           for (var [key, value] of Object.entries(input)) {
//             // @ts-ignore
//             updated[key] = value;
//           }
//         }
//       ));
//       return result;
//     }  
//   }  
// }

export async function deleteMusicPiece(displayId: string) {
  let original = await xGet<DsMusicPiece>(fGetDsMusicPiece, displayId);
  if (original) {
    await DataStore.delete(original);
  }
}
