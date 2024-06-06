import React, { useState, useEffect, useContext} from 'react';

import { Hub } from 'aws-amplify/utils'
import '@azure/core-asynciterator-polyfill'
import { Context } from '../../util/dbFront/Context';
import { useOnlineStatus } from './NetInfo';
import { Flex, Tag, Typography } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from '@ant-design/icons';

// will be set before Datastore.start; similar to example application "multitenant" (LoadAuth)
// READ https://aws.amazon.com/blogs/mobile/new-in-amplify-datastore-selective-sync-and-sort-functionality/
// oder besser: https://docs.amplify.aws/lib/datastore/sync/q/platform/js#reevaluate-expressions-at-runtime

// check out also https://itnext.io/datastore-crud-create-read-update-delete-2bceac8312e2
type MyProps = {
  children: JSX.Element | JSX.Element[]
}


export default function HasDatastore({children}: MyProps) : JSX.Element {

  const {setDatastoreSynced} = useContext(Context);
  const isOnline = useOnlineStatus();

  /* --------------- Main context variables --------------- */

  // indicates sync status of datastore

  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {

    const datastoreListener = Hub.listen('datastore', async hubData => {
      const  { event, data } = hubData.payload;
      switch (event) {
        case "syncQueriesStarted": {
          console.log("syncQueriesStarted", false);
          setDatastoreSynced(false);
          setIsSynced(false);
          break;
        }
        case "syncQueriesReady": {
          console.log("syncQueriesReady", true);
          setDatastoreSynced(true);
          setIsSynced(true);
          break;
        }
        case "ready": {
          console.log("everything ready", true);
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
  }, [isOnline])

  return(
    <>
      <StatusBar />
      {children}
    </>
  );
}

function StatusBar() {

  const isOnline = useOnlineStatus();
  const {isAuthenticated, datastoreSynced} = useContext(Context);
  

  const tagStyle = {fontSize: 16, padding: '4px 8px'};
  const colorOk = "green";
  const colorNok = "red";

  return(
    <Flex gap="8px 8px" style={{position: 'absolute', top: '100px', right: '20px'}}>
      {isAuthenticated
        ? <Tag icon={<CheckCircleOutlined />} color={colorOk} style={tagStyle}>
            You are signed in
          </Tag>
        : <Tag icon={<ExclamationCircleOutlined />} color={colorNok} style={tagStyle}>
            You are NOT signed in
          </Tag>
      }
      {isOnline
        ? <Tag icon={<CheckCircleOutlined />} color={colorOk} style={tagStyle}>
            The browser is online
          </Tag>
        : <Tag icon={<ExclamationCircleOutlined />} color={colorNok} style={tagStyle}>
            The browser is offline
          </Tag>
      }
      {isOnline && datastoreSynced
        ? <Tag icon={<CheckCircleOutlined />} color={colorOk} style={tagStyle}>
            AWS DataStore is synced
          </Tag>
        : <Tag icon={<ExclamationCircleOutlined />} color={colorNok} style={tagStyle}>
            AWS DataStore is NOT synced
          </Tag>
      }
    </Flex>
  )
}