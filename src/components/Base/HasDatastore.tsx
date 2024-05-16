import React, { useState, useEffect, useContext} from 'react';

import { Hub } from 'aws-amplify/utils'
import '@azure/core-asynciterator-polyfill'
import { Context } from '../../util/dbFront/Context';

// will be set before Datastore.start; similar to example application "multitenant" (LoadAuth)
// READ https://aws.amazon.com/blogs/mobile/new-in-amplify-datastore-selective-sync-and-sort-functionality/
// oder besser: https://docs.amplify.aws/lib/datastore/sync/q/platform/js#reevaluate-expressions-at-runtime

// check out also https://itnext.io/datastore-crud-create-read-update-delete-2bceac8312e2
type MyProps = {
  children: JSX.Element | JSX.Element[]
}


export default function HasDatastore({children}: MyProps) : JSX.Element {
  const {setDatastoreSynced} = useContext(Context);

  /* --------------- Main context variables --------------- */

  // indicates sync status of datastore

  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {

    console.log("INSTALLING DATASTORE LISTENERS");

    const datastoreListener = Hub.listen('datastore', async hubData => {
      const  { event, data } = hubData.payload;
      // console.log("=========================== HUB has DATASTORE EVENT: ===========================");
      // console.log(event);
      // console.log(data);
      switch (event) {
        case "syncQueriesStarted": {
          setDatastoreSynced(false);
          setIsSynced(false);
          break;
        }
        case "syncQueriesReady": {
          setDatastoreSynced(true);
          setIsSynced(true);
          break;
        }
        case "ready": {
          setDatastoreSynced(true);
          setIsSynced(true);
          break;
        }
      }
    });

    const authListener = Hub.listen('auth', (data) => {
      const { payload } = data;
//      this.onAuthEvent(payload);
      console.log(
        'A new auth event has happened: ',
        payload.message
      );
    });
    return(() => {
      // Remove listeners
      datastoreListener();
      authListener();
    });
  }, [])

  return(<>{children}</>);

  if (isSynced) {
    return(<>{children}</>);
  }
  else {
    return(<div>DATASTORE NOT READY</div>);
  }
}

