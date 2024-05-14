import { DsImage, DsLink, DsPostSection, LongTextField, TextField } from "../../../models";
import { GafLinkInit, ImageInit, LongTextInit, TextInit } from "../../../data/Datastore/ModelsWeb/Base/InitTypes";
import { PostSectionInit } from "../../../data/Datastore/ModelsWeb/Post/InitTypes";

export function stringFieldEqual(str1: string|null|undefined, str2: string|undefined) {
  if (str1 && str2) {
    return str1 === str2;
  }
  else {
    return ! str1 === ! str2;
  }
}

export function listEqual<S,T>(l1: S[]|null|undefined, l2: T[]|null|undefined, test: (el1: S, el2: T) => boolean) {
  if (l1 && l2) {
    if (l1.length === l2.length) {
      for (const el1 of l1) {
        if (l2.findIndex(el => test(el1, el)) < 0) {
          return false;
        }
      }
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return ! l1 === ! l2;
  }
}

export function stringListFieldEqual(strs1: string[]|undefined, strs2: string[]|undefined) {
  return listEqual(
    strs1, strs2, (s1: string, s2: string) => s1 === s2
  );
}

export function textFieldEqual(field1: TextField|null|undefined, field2: TextInit|undefined) {
  if (field1 && field2) {
    return field1.en_US === field2.en_US && field1.fr_FR === field2.fr_FR && field1.de_DE === field2.de_DE;
  }
  else {
    return ! field1 === ! field2;
  }
}

export function longTextFieldEqual(field1: LongTextField|null|undefined, field2: LongTextInit|undefined) {
  if (field1 && field2) {
    return (
      stringListFieldEqual(field1.en_US, field2.en_US) && 
      stringListFieldEqual(field1.fr_FR, field2.fr_FR) &&
      stringListFieldEqual(field1.de_DE, field2.de_DE)
    );  
  }
  else {
    return ! field1 === ! field2;
  }
}

export function numberFieldEqual(field1: number|null|undefined, field2: number|undefined, tolerance?: number) {
  if (field1 && field2) {
    const tol = tolerance || 0.000000001;
    return Math.abs(field1 - field2) < tol;  
  }
  else {
    return ! field1 === ! field2;
  }
}

export function booleanFieldEqual(field1: boolean, field2: boolean) {
  return field1 === field2;
}

export function imageFieldEqual(field1: DsImage, field2: ImageInit) {
  return (
    stringFieldEqual(field1['sm'], field2['sm']) &&
    stringFieldEqual(field1['md'], field2['md']) &&
    textFieldEqual(field1['alt'], field2['alt'])
  );
}

export function postSectionEqual(field1: DsPostSection, field2: PostSectionInit) {
  return(
    textFieldEqual(field1.headline, field2.headline) &&
    textFieldEqual(field1.subtitle, field2.subtitle) &&
    longTextFieldEqual(field1.text, field2.text) &&
    textFieldEqual(field1.subtitle, field2.subtitle) &&
    listEqual<DsLink, GafLinkInit>(field1.media, field2.media, linkEqual)
    
  )
}

function linkEqual(field1: DsLink, field2: GafLinkInit) {
  return (
    textFieldEqual(field1.label, field2.label) &&
    textFieldEqual(field1.link, field2.link) &&
    numberFieldEqual(field1.sort, field2.sort) &&
    stringFieldEqual(field1.variant, field2.variant)
  )
}

export function imageListFieldEqual(images1: DsImage[]|undefined, images2: ImageInit[]|undefined) {
  return listEqual(images1, images2, imageFieldEqual);
}
