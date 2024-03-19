import { Displayable } from './Displayable';

/*
Note: "x-getters" get a record and assert that it is found before returning.
The underlying getters may work on db-ids or displayIds, as long as the second argument matches the getter.
*/

export async function xSave<S extends Displayable, T>(
    getter: (displayId: string) => Promise<T|undefined>,
    saveFn: (input: S) => Promise<T>,
    input: S
  ) {
    if (await getter(input.displayId)) {
      throw new Error("ITC-Error: " + input.displayId + " already exists in Datastore!");
    }
    return await saveFn(input);
}
