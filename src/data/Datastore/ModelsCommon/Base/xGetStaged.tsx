import { filteredMapAsync } from "../../../../util/common/general/base";
import { LANGUAGE } from "../../../../util/common/language";

export async function xGetStaged<S, T>(
  lg: LANGUAGE, 
  getter: (idOrDisplayId: string) => Promise<S|undefined>,
  idOrDisplayId: string,
  stager: (lg: LANGUAGE, dsRec: S) => T | Promise<T>
) : Promise<T|undefined> {
  const dsRec = await getter(idOrDisplayId);
  if (dsRec) {
    return await stager(lg, dsRec);
  }
}

export async function xGetStagedList<S, T>(
  lg: LANGUAGE, 
  getter: () => Promise<S[]>,
  stager: (lg: LANGUAGE, dsRec: S) => T|undefined | Promise<T|undefined>,
  sortFn?: (x: T, y: T) => -1 | 1
) : Promise<T[]> {
  const dsRecs = await getter();
  if (dsRecs && dsRecs.length > 0) {
    const result = await filteredMapAsync<S,T>((rec: S) => stager(lg, rec), dsRecs);
    if (sortFn) {
      result.sort(sortFn);
    }
    return result;
  }
  else {
    return [] as T[];
  }
}


