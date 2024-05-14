export interface DbType {
  id: string
}

export interface Displayable {
  displayId: string
}

export interface CommonType {
  id: string
  displayId: string
}

type compareCollectionsArgs<S, T> = {
  collection1: S[], 
  collection2: T[], 
  findDiff: (el1: S, el2: T) => Promise<string|undefined>
}

export type DiffType<S,T> = {
  el1: S,
  el2: T,
  diffField?: string
}

export type DiffResult<S,T> = {
  matched: DiffType<S,T>[],
  diffs: DiffType<S,T>[],
  el1NotFound: S[],
  el2NotFound: T[]
}

export async function compareDisplaybleCollections<S extends Displayable, T extends Displayable>({collection1, collection2, findDiff}: compareCollectionsArgs<S,T>) : Promise<DiffResult<S,T>> {
  
  let matched = [] as DiffType<S,T>[], diffs = [] as DiffType<S,T>[], el1NotFound = [] as S[], el2NotFound = [] as T[];
  for (const el1 of collection1) {
    const id1 = el1['displayId'] as string;
    const el2 = collection2.find((el: T) => el['displayId'] === id1);
    if (el2) {
      const diffField = await findDiff(el1, el2);
      if (diffField) {
        diffs.push({el1, el2, diffField});
      }
      else {
        matched.push({el1, el2});
      }
    }
    else {
      el1NotFound.push(el1);
    }
  }
  for (const el2 of collection2) {
    if (! collection1.find(el1 => el1['displayId'] === el2['displayId'])) {
      el2NotFound.push(el2)
    }
  }

  return {
    matched,
    diffs,
    el2NotFound,
    el1NotFound
  };

}

