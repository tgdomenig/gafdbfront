import { DsImage, DsPost, DsPostSection, LongTextField, TextField } from "../../../../models";
import { compareDisplaybleCollections } from "../Base/Displayable";
import { imageFieldEqual, longTextFieldEqual, numberFieldEqual, postSectionEqual, stringFieldEqual, stringListFieldEqual, textFieldEqual } from "../../../../util/web/general/FieldCompare";
import { getDsPostsByStatus } from "../../ModelsCommon/Post/PostR";
import { ImageInit, LongTextInit, TextInit } from "../Base/InitTypes";
import { PostInit, PostSectionInit } from "../Post/InitTypes";


export async function compareDb(inits: PostInit[]) {
  const news = await getDsPostsByStatus({category: "News"});
  return await compareDisplaybleCollections<DsPost, PostInit>(
    {
      collection1: news,
      collection2: inits,
      findDiff
    }
  );
}

export async function findDiff(dsPost: DsPost, init: PostInit) : Promise<string|undefined> {

  type DsPostFieldType = keyof DsPost;
  type PostInitFieldType = keyof PostInit;

  const stringFields = [
    'category', 'subcategory' // MISSING: publishDate
  ];

  const stringListFields = [
    'tags'
  ];

  const textFields = [
    'title'
  ];

  const longTextFields = [
    'excerpt'
  ];

  const imageFields = [
    'featuredImage'
  ];

  const postSectionFields = [
    'content'
  ];

  const numberFields = [
    'sort'
  ];

  for (var field of stringFields) {
    if (! stringFieldEqual(
      dsPost[field as DsPostFieldType] as string, 
      init[field as PostInitFieldType] as string
    ))
    {
      return field;
    }
  }

  for (var field of stringListFields) {
    if (! stringListFieldEqual(
              dsPost[field as DsPostFieldType] as string[], 
              init[field as PostInitFieldType] as string[]
        ))
      {
        return field;
      }
  }

  for (var field of textFields) {
    if (! textFieldEqual(
              dsPost[field as DsPostFieldType] as TextField, 
              init[field as PostInitFieldType] as TextInit
        ))
      {
        return field;
      }
  }

  for (var field of longTextFields) {
    if (! longTextFieldEqual(
              dsPost[field as DsPostFieldType] as LongTextField, 
              init[field as PostInitFieldType] as LongTextInit
        ))
      {
        return field;
      }
  }

  for (var field of numberFields) {
    if (! numberFieldEqual(
              dsPost[field as DsPostFieldType] as number, 
              init[field as PostInitFieldType] as number
        ))
      {
        return field;
      }
  }

  for (var field of imageFields) {
    if (! imageFieldEqual(
              dsPost[field as DsPostFieldType] as DsImage, 
              init[field as PostInitFieldType] as ImageInit
        ))
      {
        return field;
      }
  }

  for (var field of postSectionFields) {
    if (! postSectionEqual(
              dsPost[field as DsPostFieldType] as DsPostSection, 
              init[field as PostInitFieldType] as PostSectionInit
        ))
      {
        return field;
      }
  }
}
