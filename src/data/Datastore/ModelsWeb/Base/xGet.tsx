import { assertNReturn } from './Util';

/*
Note: "x-getters" get a record and assert that it is found before returning.
The underlying getters may work on db-ids or displayIds, as long as the second argument matches the getter.
*/

// identifier is typically the id or displayId; in case of Concours objects it could also be the year
export async function xGet<T>(
    getter: (identifier: string) => Promise<T|undefined>, 
    identifier: string
  ) {
    const result = await getter(identifier);
    return assertNReturn(result, identifier);
}
