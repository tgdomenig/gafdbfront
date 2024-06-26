
import { DataStore, Predicates } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill';

import { DsGenericItem } from '../../../../models';
import { CountryInit, GenericItemInit } from '../Base/InitTypes';
import { xSaveOrUpdate } from '../Base/xSaveOrUpdate';
import { _CATEGORY_COUNTRY_, fGetDsGenericItem, getDsGenericItem } from '../../ModelsCommon/Generic/GenericR';

/* ----------------------------- SAVE ----------------------- */
export async function saveGenericItem(input: GenericItemInit) : Promise<DsGenericItem> {
  const result = await DataStore.save(new DsGenericItem(input));
  return result;
}

export async function saveCountry(input: CountryInit) : Promise<DsGenericItem> {
  const {name, ...rest} = input;
  return await saveGenericItem({textField: name, ...rest, category: _CATEGORY_COUNTRY_});
}

export async function saveOrUpdateGenericItem(input: GenericItemInit, id?: string) : Promise<DsGenericItem> {
  if (id) {
    return xSaveOrUpdate<GenericItemInit, DsGenericItem>(
      getDsGenericItem,
      DsGenericItem.copyOf,
      saveGenericItem,
      id,
      input
    );
  }
  else {
    return xSaveOrUpdate<GenericItemInit, DsGenericItem>(
      fGetDsGenericItem,
      DsGenericItem.copyOf,
      saveGenericItem,
      input.displayId,
      input
    );  
  }

}


export async function deleteAllDsGenericItems() {
  await DataStore.delete(DsGenericItem, Predicates.ALL);
}
