import { DataStore } from "@aws-amplify/datastore";
import { ConfigItem } from "../../../../models";

export async function getConfigItem(id: string) : Promise<ConfigItem|undefined> {
  return  await DataStore.query(ConfigItem, id);
}

export async function fGetConfigItem(displayId: string) : Promise<ConfigItem|undefined> {
  return (await DataStore.query(ConfigItem)).find(cfg => (cfg ? cfg.displayId === displayId : undefined));
}

export async function getConfigItems() : Promise<ConfigItem[]> {
  return (await DataStore.query(ConfigItem));
}
