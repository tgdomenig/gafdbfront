import { DsConcert, DsImage, TextField } from "../../../../models";
import { compareDisplaybleCollections } from "../Base/Displayable";
import { getDsConcerts } from "../../ModelsCommon/Concerts/ConcertR";
import { ImageInit, TextInit } from "../Base/InitTypes";
import { DsConcertInit } from "./InitTypes";
//import { imageListFieldEqual, listEqual, textFieldEqual } from "../../../../util/web/general/FieldCompare";
import { booleanEq, numberEq, stringEq } from "../../../../util/common/general/tests";
import { imageListFieldEqual, listEqual, textFieldEqual } from "../../../../util/web/general/FieldCompare";


export async function compareDb(inits: DsConcertInit[]) {
  const dsConcerts = await getDsConcerts();
  return await compareDisplaybleCollections<DsConcert, DsConcertInit>(
    {
      collection1: dsConcerts,
      collection2: inits,
      findDiff
    }
  );
}

export async function findDiff(dsConcert: DsConcert, init: DsConcertInit) : Promise<string|undefined> {

  type DsConcertFieldType = keyof DsConcert;
  type DsConcertInitFieldType = keyof DsConcertInit;

  const stringFields = [
    'wpId', 'title', 'date', 'conductor', 'link'
  ];

  const textFields = [
    'titleFreetext', 'times', 'location', 'orchestra', 'performersFreetext', 'program'
  ]

  const numberFields = [
    'locationLat', 'locationLng'
  ];

  const booleanFields = [
    'soloRecital', 'addPianist', 'sponsoredGAF', 'sponsoredSteinway'
  ];

  const imageListFields = [
    'otherSponsors'
  ];
    
  for (var field of stringFields) {
    if (! stringEq(
          dsConcert[field as DsConcertFieldType] as string, 
          init[field as DsConcertInitFieldType] as string
    ))
    {
      return field;
    }
  }

  for (var field of textFields) {
    if (! textFieldEqual(
              dsConcert[field as DsConcertFieldType] as TextField, 
              init[field as DsConcertInitFieldType] as TextInit
        ))
      {
        return field;
      }
  }

  for (var field of numberFields) {
    if (! numberEq(
              dsConcert[field as DsConcertFieldType] as number, 
              init[field as DsConcertInitFieldType] as number
        ))
      {
        return field;
      }
  }

  for (var field of booleanFields) {
    if (! booleanEq(
              dsConcert[field as DsConcertFieldType] as boolean, 
              init[field as DsConcertInitFieldType] as boolean
        ))
      {
        return field;
      }
  }

  for (var field of imageListFields) {
    if (! imageListFieldEqual(
              dsConcert[field as DsConcertFieldType] as DsImage[], 
              init[field as DsConcertInitFieldType] as ImageInit[]
        ))
      {
        return field;
      }
  }

  /* --- managed Artists --- */
  let mgdArtists = [] as string[];
  for await (const c of dsConcert.managedArtists) {
    mgdArtists.push((await c.dsPerson).name);
  }

  if (! listEqual(mgdArtists, init.managedArtists,(a:string, b:string) => a === b)) {
    return 'managedArtists'
  }
}
