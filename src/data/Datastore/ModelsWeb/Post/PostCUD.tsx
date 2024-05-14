
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsPost } from '../../../../models';
import { PostInit } from './InitTypes';

/* ----------------------------- SAVE ----------------------- */
export async function savePost(input: PostInit) : Promise<DsPost> {
  return await DataStore.save(new DsPost(input));
}


// export type PostUpdateInit = PostInit & { newDisplayId: string };

// export async function saveOrUpdatePost(input: PostInit) : Promise<DsPost|undefined> {

//   const {displayId} = input;
//   let original = displayId && await fGetDsPost(displayId);
//   if (original) {
//     if (original) {
//       const result = await DataStore.save(DsPost.copyOf(
//         original,
//         updated => {
//           for (var [key, value] of Object.entries(input)) {
//             // @ts-ignore
//             updated[key] = value;
//           }
//         }
//       ));
//       return result;
//     }
//   }
//   else {
//     return await savePost(input);
//   }
// }



// export async function updatePost({displayId, newDisplayId, ...input}: Partial<PostUpdateInit>) : Promise<string|undefined> {
  
//   // must have displayId
//   let original = displayId && await fGetDsPost(displayId);

//   if (original) {
//     const result = await DataStore.save(DsPost.copyOf(
//       original,
//       updated => {
//         if (newDisplayId) {
//           updated['displayId'] = newDisplayId;
//         }
//         for (var [key, value] of Object.entries(input)) {
//           // @ts-ignore
//           updated[key] = value;
//         }
//       }
//     ));
//     return result.id;
//   }
// }


// export async function saveOrUpdateNewsPost(input: PostInit) : Promise<DsPost> {
//   const {displayId} = input;
//   if (displayId) {
//     const original = await fGetDsPost(displayId);
//     if (original) {
//       console.log("deleting NewsPost: " + displayId);
//       await DataStore.delete(original);
//     }
//   }
//   return await savePost(input);
// }

// export async function updatePost2(id: string, input: Partial<PostInit>) : Promise<DsPost> {
  
//   let original = await xGetDsPost({id});
//   const result = await DataStore.save(DsPost.copyOf(
//     original,
//     updated => {
//       for (var [key, value] of Object.entries(input)) {
//         // @ts-ignore
//         updated[key] = value;
//       }
//     }
//   ));
//   return result;
// }
