import { DataStore } from "@aws-amplify/datastore";

export async function xDelete<T>(
  getter: (idOrDisplayId: string) => Promise<T|undefined>, 
  idOrDisplayId: string
) {
  const original = await getter(idOrDisplayId);
  if (original) {
    await DataStore.delete(original);
  }
}
