
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill';

import { DsGenericItem } from '../../../../models';

export const _CATEGORY_COUNTRY_ = "Country";

/* ----------------------------- GET DS ----------------------- */
export type getDsGenericItemsProps = {
  category: string
}

export async function getDsGenericItems(props?: getDsGenericItemsProps) : Promise<DsGenericItem[]> {
  const {category} = props || {};
  if (category) {
    return await DataStore.query(DsGenericItem, item => item.category.eq(category));
  }
  else {
    return await DataStore.query(DsGenericItem);
  }
}

export async function getDSCountries(): Promise<DsGenericItem[]> {
  return await getDsGenericItems({category: _CATEGORY_COUNTRY_});
}


export async function getDsGenericItem(id: string) : Promise<DsGenericItem | undefined> {
  const rec = await DataStore.query(DsGenericItem, id);
  return rec || undefined;
}

export async function fGetDsGenericItem(displayId: string) : Promise<DsGenericItem | undefined> {
  return (await DataStore.query(DsGenericItem)).find(c => c.displayId === displayId);
}

