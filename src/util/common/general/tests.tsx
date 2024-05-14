

export function isFalseOrEmpty(something: any): boolean {
  if (Array.isArray(something)) {
    return something.length == 0;
  }
  else if (typeof something === 'object') {
    return isFalseOrEmpty(Object.keys(something));
  }
  else {
    return !something;
  }
}

export function isString(el: any) {
  return typeof el === 'string' || el instanceof String;
}

export function stringEq(s1: string|null|undefined, s2: string|undefined) {
  return (s1 && s2) ? s1 === s2 : (! s1) === (! s2);
}

export function listEq<S,T>(l1: S[]|null|undefined, l2: T[]|null|undefined, test: (el1: S, el2: T) => boolean) {
  if (l1 && l2) {
    if (l1.length === l2.length) {
      for (const el1 of l1) {
        if (l2.findIndex(el => test(el1, el)) < 0) {
          return false;
        }
      }
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return ! l1 === ! l2;
  }
}

export function stringListEq(sl1: string[]|undefined, sl2: string[]|undefined) {
  return listEq(
    sl1, sl2, (s1: string, s2: string) => s1 === s2
  );
}

export function numberEq(x: number|null|undefined, y: number|undefined, tolerance?: number) {
  if (x && y) {
    const tol = tolerance || 0.000000001;
    return Math.abs(x - y) < tol;  
  }
  else {
    return ! x === ! y;
  }
}

export function booleanEq(field1: boolean, field2: boolean) {
  return field1 === field2;
}

export function itcAssert(id: string, ...data: any[]) {
  if (! test) {
    itcLog(id, ...data);
  }
}

export function itcLog(id: string, ...data: any[]) {
  console.log(` ------------------- < ${id} > ------------------- `);
  if (data.length > 0) {
    console.log(JSON.stringify(data[0]));
    data.slice(1,).map(d => {
      console.log(` - - - - - - - - - - - - - - - - - - - - - - - - - `); 
      console.log(JSON.stringify(d));
    });
  }
  console.log(` ------------------- </ ${id} > ------------------- `);  
}