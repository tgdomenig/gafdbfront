import { LANGUAGE } from "./Const";

export type LgLookup = {
  en_US: string,
  de_DE: string,
  fr_FR: string
}

export type LgLookup1 = {
  en_US: (a:string) => string,
  de_DE: (a:string) => string,
  fr_FR: (a:string) => string
}

export type LgLookup2 = {
  en_US: (a:string,b:string) => string,
  de_DE: (a:string,b:string) => string,
  fr_FR: (a:string,b:string) => string
}

export function lgLookup(lg: LANGUAGE, table: Map<string, LgLookup>, key: string) {
  if (! table) { console.info("Unknown table for key " + key); }
  const f = table.get(key);
  if (f) {
    return f[lg];
  }
  return "unknown lg-key: " + key;
}

export function lgLookup1(lg: LANGUAGE, table: Map<string, LgLookup1>, key: string, arg: string) {
  const f = table.get(key);
  if (f) {
    return f[lg](arg);
  }
}

export function lgLookup2(lg: LANGUAGE, table: Map<string, LgLookup2>, key: string, arg1: string, arg2: string) {
  const f = table.get(key);
  if (f) {
    return f[lg](arg1, arg2);
  }
}

