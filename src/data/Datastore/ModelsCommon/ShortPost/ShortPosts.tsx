
import { DataStore } from "@aws-amplify/datastore";
import { DsPublicationStatus, DsShortPost } from "../../../../models";
import { stageMandatoryTextField } from "../Base/Staging";
import { ShortPost } from "./ShortPostTypes";
import { QueryOperator, getDSPublishable, getDsPublishableProps } from "../Base/getDsPublishable";
import { LANGUAGE } from "../../../../util/common/language";


export function stageShortPost(lg: LANGUAGE, post: DsShortPost) : ShortPost | undefined {
  const {id, displayId, category, textField, publishDate, publicationStatus} = post;

  if (textField) {
    const text = stageMandatoryTextField(lg, textField);
    const {title, blocks} = JSON.parse(text);

    // @ts-ignore
    const pubStatus = publicationStatus as DsPublicationStatus;
    return({
      id,
      publicationStatus: pubStatus,
      displayId,
      category: category || "",
      title,
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      blocks
    })
  }
}

export async function getDSShortPost(id: string): Promise<DsShortPost|undefined> {
  return await _get(id);
}

export async function getDSShortPosts(props?: getDsPublishableProps): Promise<DsShortPost[]> {
  return await getDSPublishable(
    props,
    {
      getAll: _getAll,
      getCategory: _getCategory,
      getStatus: _getStatus,
      getCategoryStatus: _getCategoryStatus
    }
  );
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsShortPost | undefined> => 
      await DataStore.query(DsShortPost, id);

// const _fGet = async (displayId: string) : Promise<DsShortPost | undefined> => 
//       chooseFirst(await DataStore.query(DsShortPost, rec => rec.displayId.eq(displayId)), displayId);

const _getAll = async () : Promise<DsShortPost[]> => 
  await DataStore.query(DsShortPost);

const _getCategory = async (category: string) : Promise<DsShortPost[]> => 
  await DataStore.query(DsShortPost, p => p.category.eq(category));

const _getCategoryStatus = async (category: string, status: DsPublicationStatus, op: QueryOperator) : Promise<DsShortPost[]> => 
  (op === "eq")
    ? await DataStore.query(DsShortPost, p => p.and(p => [p.category.eq(category), p.publicationStatus.eq(status)]))
    : await DataStore.query(DsShortPost, p => p.and(p => [p.category.eq(category), p.publicationStatus.ne(status)]))

const _getStatus = async (status: DsPublicationStatus, op: QueryOperator) : Promise<DsShortPost[]> => 
  (op === "eq")
    ? await DataStore.query(DsShortPost, p => p.publicationStatus.eq(status))
    : await DataStore.query(DsShortPost, p => p.publicationStatus.ne(status))
