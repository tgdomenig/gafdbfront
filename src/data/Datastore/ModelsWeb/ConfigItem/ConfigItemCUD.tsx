import { DataStore, Predicates } from "@aws-amplify/datastore";
import { ConfigItem } from "../../../../models";
import { fGetConfigItem } from "../../ModelsCommon/ConfigItem/ConfigItemR";


export type ConfigItemInit = {
  displayId: string
  data: string
}

export async function updateConfigItem(input: ConfigItemInit) : Promise<ConfigItem|undefined> {
  const {displayId, data} = input;

  const original = await fGetConfigItem(displayId);

  
  if (original) {
    const result = await DataStore.save(ConfigItem.copyOf(
      original,
      updated => {
          // @ts-ignore
          updated['data'] = data;
      }
    ));

    return result;
  }
  else {
    return await DataStore.save(new ConfigItem(input));
  }
}

export async function deleteConfigItem(displayId: string) : Promise<true|undefined> {
  const original = await fGetConfigItem(displayId);
  if (original) {
    await DataStore.delete(original);
    return true;
  }
}

export async function deleteAllConfigItems() {
  await DataStore.delete(ConfigItem, Predicates.ALL);
}
