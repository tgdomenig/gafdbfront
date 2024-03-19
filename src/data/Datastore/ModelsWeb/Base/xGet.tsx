import { assertNReturn } from './Util';

/*
Note: "x-getters" get a record and assert that it is found before returning.
The underlying getters may work on db-ids or displayIds, as long as the second argument matches the getter.
*/

export async function xGet<T>(
    getter: (idOrDisplayId: string) => Promise<T|undefined>, 
    idOrDisplayId: string
  ) {
    const result = await getter(idOrDisplayId);
    return assertNReturn(result, idOrDisplayId);
}
