import { DataStore, MutableModel } from '@aws-amplify/datastore';
import { Displayable } from './Displayable';
import { xGet } from './xGet';

export async function xUpdate<S extends Displayable, T extends Displayable>(
    getter: (idOrDisplayId: string) => Promise<T|undefined>,
    copyFn: (input: T, mutator: (draft: MutableModel<Readonly<T>>) => void) => T,
    idOrDisplayId: string,
    input: Partial<S>,
    newDisplayId?: string
  ) {
    const {...rest} = input;
    let original = await xGet<T>(getter, idOrDisplayId);

    if (original) {
      const result = await DataStore.save(copyFn(
        original,
        updated => {
          if (newDisplayId) {
            // @ts-ignore
            updated['displayId'] = newDisplayId;
          }
          for (var [key, value] of Object.entries(input)) {
            // @ts-ignore
            updated[key] = value;
          }
        }
      ));
      return result;
    }
}
