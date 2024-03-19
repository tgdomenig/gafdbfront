import { DataStore } from "@aws-amplify/datastore";
import '@azure/core-asynciterator-polyfill'

export async function resetDatastore() {
    console.info('Clearing DataStore')
    await DataStore.clear()
    console.info('Starting DataStore')
    await DataStore.start()
    console.info('DataStore started')
}

export async function clearDatastore() {
  await DataStore.clear();
}
