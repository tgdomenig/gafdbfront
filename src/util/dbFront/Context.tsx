import { createContext } from "react";

export interface AppContextInterface {
  datastoreSynced: boolean,
  setDatastoreSynced: Function,
}

export const Context = createContext<AppContextInterface>(
  {
    datastoreSynced: false,
    setDatastoreSynced:  () => {},
  }
);
