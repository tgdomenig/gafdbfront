
import { DsPublicationStatus } from "../../../../models"

// draft => submitted => published

export type QueryOperator = "eq" | "ne"

export type getDsPublishableProps = {
  category?: string,
  publicationStatus?: DsPublicationStatus,
  queryOperator?: QueryOperator
}

type getDsPublishableGetters<T> = {
  getAll: () => Promise<T[]>,
  getCategory: (category: string) => Promise<T[]>,
  getStatus: (publicationStatus: DsPublicationStatus, queryOperator: QueryOperator) => Promise<T[]>,
  getCategoryStatus: (category: string, publicationStatus: DsPublicationStatus, queryOperator: QueryOperator) => Promise<T[]>
}

export async function getDSPublishable<T>(props: getDsPublishableProps | undefined, getters: getDsPublishableGetters<T>): Promise<T[]> {

  const {category, publicationStatus, queryOperator} = props || {category: undefined, publicationStatus: undefined, queryOperator: undefined};
  const {getAll, getCategory, getStatus, getCategoryStatus} = getters;

  if (publicationStatus) {
    if (category) {
      return await getCategoryStatus(category, publicationStatus, queryOperator || "eq");
    }
    else {
      return await getStatus(publicationStatus, queryOperator || "eq");
    }
  }
  else {
    if (category) {
      return await getCategory(category);
    }
    else {
      return await getAll();
    }
  }
}
