

export function isFalseOrEmpty(something: any) : boolean {
  if (Array.isArray(something)) {
    return something.length == 0;
  }
  else if (typeof something === 'object') {
    return isFalseOrEmpty(Object.keys(something));
  }
  else {
    return ! something;
  }
}

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

export function isString(el: any) {
  return typeof el === 'string' || el instanceof String;
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

export function intersect<S, T>(l1: S[]|undefined, l2: T[]|undefined, test?: (el1: S, el2: T) => boolean) : boolean {
  if (l1 && l2 && l1.length > 0 && l2.length > 0) {
    const effectiveTest = test || ((el1: any, el2: any) => el1 === el2);
    return !! l1.find(el1 => l2.find(el2 => effectiveTest(el1, el2)));
  }
  else {
    return false;
  }
}