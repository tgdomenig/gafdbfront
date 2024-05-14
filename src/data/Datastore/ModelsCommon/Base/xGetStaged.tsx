import { filteredMapAsync } from "../../../../util/common/general/collections";
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
  opts?: {
    sortFn?: (x: T, y: T) => -1 | 1, 
    filter?: (x: S) => boolean
  }
) : Promise<T[]> {
  const dsRecs = await getter();
  const {sortFn, filter} = opts || {};
  if (dsRecs && dsRecs.length > 0) {

    const result = await filteredMapAsync<S,T>(
      (rec: S) => (! filter || filter(rec)) ? stager(lg, rec) : undefined, 
      dsRecs
    );
    
    if (sortFn) {
      result.sort(sortFn);
    }
    return result;
  }
  else {
    return [] as T[];
  }
}


