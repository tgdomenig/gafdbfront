
import { MutableModel } from '@aws-amplify/datastore';
import { xUpdate } from './xUpdate';
import { Displayable } from './Displayable';

export async function xSaveOrUpdate<S extends Displayable, T extends Displayable>(
    getter: (idOrDisplayId: string) => Promise<T|undefined>,
    copyFn: (input: T, mutator: (draft: MutableModel<Readonly<T>>) => void) => T,
    saveFn: (input: S) => Promise<T>,
    idOrDisplayId: string,
    input: S,
    newDisplayId?: string
  ) : Promise<T> {

    let result;
    if (await getter(idOrDisplayId)) {
      result = await xUpdate<S, T>(getter, copyFn, idOrDisplayId, input, newDisplayId);
    }
    if (! result) {
      result = await saveFn(input);
    }
    return result;
  }
  
  