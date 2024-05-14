import { DataStore } from '@aws-amplify/datastore';
import { DsNotificationRecipient, DsVote } from '../../../../models';

/* ----------------------------- GET ----------------------- */
export async function getDsNotificationRecipients() : Promise<DsNotificationRecipient[]> {
  return await _getAll();
}

export async function getDsNotificationRecipient(token: string) : Promise<DsNotificationRecipient|undefined> {
  return await _get(token);
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (token: string) : Promise<DsNotificationRecipient | undefined> => 
      await DataStore.query(DsNotificationRecipient, token);

const _getAll = async () : Promise<DsNotificationRecipient[]> => 
      await DataStore.query(DsNotificationRecipient);
