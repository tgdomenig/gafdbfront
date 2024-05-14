

export async function mapAsync<S, T>(asyncFn: Function, list: Array<S>) : Promise<Array<T>> {
  const result = [];
  if (list) {
    for (var el of list) {
      result.push(await asyncFn(el));
    }
  }
  return result;
}

export async function filterAsync<T>(asyncFn: (x: T) => Promise<boolean>, list: Array<T>) : Promise<Array<T>> {
  const result = [];
  if (list) {
    for (var el of list) {
      if (await asyncFn(el)) {
        result.push(el);
      }
    }
  }
  return result;
}

export async function filteredMapAsync<S, T>(asyncFn: Function, list: Array<S>) : Promise<Array<T>> {
  const result = [];
  if (list) {
    for (var el of list) {
      const mapped = await asyncFn(el);
      if (mapped) {
        result.push(mapped);
      }
    }
  }
  return result;
}

export async function filteredMap<S, T>(fn: Function, list: Array<S>) : Promise<Array<T>> {
  const result = [];
  if (list) {
    for (var el of list) {
      const mapped = await fn(el);
      if (mapped) {
        result.push(mapped);
      }
    }
  }
  return result;
}

export function removeDuplicates<T>(l: T[]) : T[] {
  return l.filter((item, index) => l.indexOf(item) === index);
}

export function replaceOrAppend<T>(l: T[], newEl: T, compare: (el1: T, el2: T) => boolean) : T[] {

  let foundIt = false;
  l.map(el => { 
    if (compare(el, newEl)) {
      foundIt = true;
      return newEl; // replace element
    }
    else {
      return el;
    }
  });
  if (! foundIt) {
    l.push(newEl); // append element
  }

  return l;
}

// returns same list if element is already present, otherwise a copy of the list with new element pushed to the end
export function pushNew<T>(l: T[], newEl: T, test?: (el: T) => boolean) : T[] {
  const ix = l.findIndex(test ? test : (el) => el === newEl);
  return (ix > -1) ? l : l.concat(newEl);
}

// returns same list if element is not present, otherwise a copy of the list with element removed
export function removeFrom<T>(l: T[], el: T, test?: (el: T) => boolean) : T[] {
  const ix = l.findIndex(test ? test : (el) => el === el);
  if (ix > -1) {
    const newL = [...l]; // copy it
    newL.splice(ix, 1);
    return newL;
  }
  else {
    return l;
  }
}

// returns same list if element is not in array, otherwise a copy of the array with element removed
export function removeFromArray<T>(l: T[], el: T, compare: (el1: T, el2: T) => boolean) : T[] {
  const ix = l.findIndex(x => compare(x, el));
  return ix > -1 ? l.splice(ix, 1) : l;
}

export function intersect<S, T>(l1: S[]|undefined, l2: T[]|undefined, test?: (el1: S, el2: T) => boolean) : boolean {
  if (l1 && l2 && l1.length > 0 && l2.length > 0) {
    const effectiveTest = test || ((el1: any, el2: any) => el1 === el2);
    return !! l1.find(el1 => l2.find(el2 => effectiveTest(el1, el2)));
  }
  else {
    return false;
  }
}
export function chooseFirst<T>(recs: T[], what?: string) {
  if (recs.length > 0) {
    return recs[0];
  }
  else if (!!what) {
    console.log(what + " not found!");
  }
}

export function partitionAsMap<T>(l: T[], getKey: (el: T) => string) : Map<string, T[]> {

  const map = new Map<string, T[]>();

  for (var el of l) {
    const key = getKey(el);
    const entry = map.get(key);
    if (entry) {
      entry.push(el);
    }
    else {
      map.set(key, [el]);
    }
  }
  return map;
}

export function partitionByKey<T>(l: T[], getKey: (el: T) => string, sortByKey?: "ASC" | "DESC")
  : {key: string, value: T[]}[] {

  const map = partitionAsMap(l, getKey);
  
  const result = (Array.from(map)).map(([key, value]) => ({key, value}));

  if (sortByKey) {
    result.sort(
      sortByKey === "ASC" 
        ? ((x, y) => x['key'] < y['key'] ? -1 : 1)
        : ((x, y) => x['key'] > y['key'] ? -1 : 1)
    );
  }
  return result;
}