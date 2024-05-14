import { DataStore, LazyLoading } from "@aws-amplify/datastore";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export function observeModel<S extends LazyLoading, T extends {loaded: boolean}>(
    model: LazyLoading, 
    setState: Dispatch<SetStateAction<T>>, 
    busy: MutableRefObject<boolean>, 
    ignoreIf?: (msg: LazyLoading) => boolean
  ) {
    const observer = DataStore.observe(model).subscribe(msg => {
      if (! busy.current) {
        if (! ignoreIf || ignoreIf(msg.element)) {
          busy.current = true;
          setTimeout(() => {
            setState((state: T) => ({...state, loaded: false}));
            busy.current = false;
          }, 500);
        }  
      }
    });

  return(() => { observer.unsubscribe(); });
}

export function observeModel2<S extends LazyLoading, T extends {loaded: boolean}>(
  model: LazyLoading, 
  setState: Dispatch<SetStateAction<T>>, 
  busy: MutableRefObject<boolean>, 
  ignoreIf?: (msg: LazyLoading, updatedAt: string) => boolean
) {
  const observer = DataStore.observe(model).subscribe(msg => {

    if (! busy.current) {
      if (!! ignoreIf) {
        let updatedAt = "";
        if (msg.opType === "UPDATE" && 'updatedAt' in msg.element) {
          // @ts-ignore
          updatedAt = msg.element.updatedAt;
        }
        if (! ignoreIf(msg.element, updatedAt)) {
          busy.current = true;
          setTimeout(() => {
            setState((state: T) => ({...state, loaded: false})); // trigger reload
            busy.current = false;
          }, 500);
        }
      }
    }
  });
  return(() => { observer.unsubscribe(); }); // cleanup
}