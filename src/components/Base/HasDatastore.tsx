import React, { Component , useState, useEffect} from 'react';

import { Hub } from 'aws-amplify/utils'
import { DataStore } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

// will be set before Datastore.start; similar to example application "multitenant" (LoadAuth)
// READ https://aws.amazon.com/blogs/mobile/new-in-amplify-datastore-selective-sync-and-sort-functionality/
// oder besser: https://docs.amplify.aws/lib/datastore/sync/q/platform/js#reevaluate-expressions-at-runtime

// check out also https://itnext.io/datastore-crud-create-read-update-delete-2bceac8312e2
type MyProps = {
  children: JSX.Element | JSX.Element[]
}


export default function HasDatastore({children}: MyProps) : JSX.Element {

  /* --------------- Main context variables --------------- */

  // indicates sync status of datastore
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const hubListener = Hub.listen('datastore', async hubData => {
      const  { event, data } = hubData.payload;
      // console.log("=========================== HUB has DATASTORE EVENT: ===========================");
      // console.log(event);
      // console.log(data);
      switch (event) {
        case "syncQueriesStarted": {
          setIsSynced(false);
          break;
        }
        case "syncQueriesReady": {
          setIsSynced(true);
          break;
        }
        case "ready": {
          setIsSynced(true);
          break;
        }
      }
    });

    Hub.listen('auth', (data) => {
      const { payload } = data;
//      this.onAuthEvent(payload);
      console.log(
        'A new auth event has happened: ',
        payload.message
      );
    });
    return(() => {
      // Remove listener
      console.log("App: Cleanup Hub Listener listener");
      hubListener();
    });
  }, [])

  const [dataStoreReady, setDatastoreReady] = useState(false);

  // const clearDS = async () => {
  //   await DataStore.clear();
  //   console.info("Clear - DataStore");
  // };

  const startDS = async () => {
//    console.log("=========================== DATASTORE CLEAR: ===========================");
//    await clearDS();
    console.log("=========================== DATASTORE START: ===========================");
    await DataStore.start();
    setDatastoreReady(true);
    console.info("Start - DataStore");
  };

  useEffect(() => {
    setIsSynced(false);
    startDS();
  }, []);

  console.log("isSynced: " + isSynced);
  if (isSynced && dataStoreReady) {
    return(<>{children}</>);
  }
  else {
    return(<div>DATASTORE NOT READY</div>);
  }
}

