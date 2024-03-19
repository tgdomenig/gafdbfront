import { LANGUAGE } from "../../../../util/common/language";

type Sortable = {sort?: number | null};

export function sortNReturn<T extends Sortable>(l: T[]) {
  l.sort((a,b) => (! a.sort) ? 1 : ((! b.sort) ? -1 : ((a.sort > b.sort) ? 1 : -1)));
  return l;
}

export function ErrorMsg(msg: string, additionalInfo?: string) {
  return `ITC-Error: ${msg} ${additionalInfo ? `(${additionalInfo})` : ""}`;
}

export function assertOneNReturn<T>(recs: T[], what: string, additionalInfo?: string) : T {
  if (! recs || recs.length === 0) {
    throw new Error(ErrorMsg(what + " not found!", additionalInfo));
  }
  else if (recs.length > 1) {
    console.log(recs);
    throw new Error(ErrorMsg("Multiple Records for " + what + " found!", additionalInfo));
  }
  return recs[0];
}


export function assertNReturn<T>(ob: T, what: string) {
  if (ob) {
    return ob;
  }
  else {
    throw new Error(ErrorMsg(what + " not found!"));
  }
}


/*
NOTE: must functionaries have one of a list of standard roles. The display names of these (en, fr, de) are hard coded.
For non-standard roles, display names in all three languages have to be provided and are stored in the datastore.
*/
export type FunctionaryStandardRole = "Jury Chairman" | "Member of Jury" | "Screening Jury" | "Conductor Final Concert" | "Conductor Semi-Final Mozart Concert Winterthur";

export const FUNCTIONARY_STANDARD_ROLES = new Map([
  [
    "Jury Chairman", 
    {
      en_US: "Jury Chairman",
      fr_FR: "Président du Jury",
      de_DE: "Vorsitzender"
    }
  ],
  [
    "Member of Jury", 
    {
      en_US: "",
      fr_FR: "",
      de_DE: ""
    }
  ],
  [
    "Screening Jury", 
    {
      en_US: "Screening Jury",
      fr_FR: "Jury de pré-selection",
      de_DE: "Screening Jury"
    }
  ],
  [
    "Conductor Final Concert", 
    {
      en_US: "Conductor Final Concert",
      fr_FR: "Chef d’orchestre du concert final",
      de_DE: "Dirigent Finalkonzert"
    }
  ],
  [
    "Conductor Semi-Final Mozart Concert Winterthur",
    {
      en_US: "Conductor Mozart-Semifinal Winterthur",
      fr_FR: "Chef d’orchestre Demi-finale Mozart Winterthur",
      de_DE: "Dirigent Mozart-Semifinal Winterthur"
    }
  ]
]);

// export type RoundNb = "Zero" | "One" | "Two" | "Three" | "Four";


export async function stageRecs<S,T>(lg: LANGUAGE, recs: S[], stageFn: (lg: LANGUAGE, rec: S) => T) : Promise<T[]> {
  return (recs && recs.length > 0) ? recs.map(rec => stageFn(lg, rec)) : [];
}

