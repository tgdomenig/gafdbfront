
//import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import '@azure/core-asynciterator-polyfill'

import { DsConcert, DsPublicationStatus } from '../../../../models';
import { format } from 'date-fns';
import { chooseFirst } from "../../../../util/common/general/collections";
import { DataStore } from 'aws-amplify/datastore';
import { QueryOperator, getDSPublishable, getDsPublishableProps } from '../Base/getDsPublishable';

/* ----------------------------- GET ----------------------- */
export type getDsConcertsProps = {
  fromDate?: Date,
  toDate?: Date
}

export async function getDsConcerts(props?: getDsConcertsProps) : Promise<DsConcert[]> {
  const {fromDate, toDate} = props || {};

  const recs = _getInDateRange(
    fromDate ? format(fromDate, "yyyy-MM-dd") : "",
    toDate ? format(toDate, "yyyy-MM-dd") : ""
  )
//  recs.sort((d1, d2) => d1.date < d2.date ? 1 : 0);
  return recs;
}

export async function getDsConcert(concertId: string) {
  return await _get(concertId);
}

export async function fGetDsConcert(displayId: string) {
  return await _fGet(displayId);
}

/* 
This method follows the standard pattern for publishable items (like ShortPosts and Concerts).
There is some overlap to getDsPosts
*/
export async function getDsConcertsByStatus(props: getDsPublishableProps): Promise<DsConcert[]> {
  return await getDSPublishable(
    props,
    {
      getAll: _getAll,
      getCategory: (category: string) => _getAll(), // note: there is no category for concerts
      getStatus: _getStatus,
      getCategoryStatus: (category: string, status: DsPublicationStatus, op: QueryOperator) => _getStatus(status, op)
    }
  );
}

/* ------------------ Basic Accessors -------------------- */

const _get = async (id: string) : Promise<DsConcert | undefined> => 
      await DataStore.query(DsConcert, id);

const _fGet = async (displayId: string) : Promise<DsConcert | undefined> => 
      chooseFirst(await DataStore.query(DsConcert, rec => rec.displayId.eq(displayId)), displayId);

const _getAll = async () : Promise<DsConcert[]> => {
  const result = await DataStore.query(DsConcert);
  return result;
}

const _getInDateRange = async (fromDateStr: string, toDateStr: string) : Promise<DsConcert[]> => {
      if (fromDateStr && toDateStr) {
        return await DataStore.query(DsConcert, c => c.date.between(fromDateStr, toDateStr));
      }
      else if (fromDateStr) {
        return await DataStore.query(DsConcert, c => c.date.ge(fromDateStr));
      }
      else if (toDateStr) {
        return await DataStore.query(DsConcert, c => c.date.le(toDateStr));
      }
      else {
        return await _getAll();
      }
}

const _getStatus = async (status: DsPublicationStatus, op: QueryOperator) : Promise<DsConcert[]> => 
    (op === "eq")
      ? await DataStore.query(DsConcert, p => p.publicationStatus.eq(status))
      : await DataStore.query(DsConcert, p => p.publicationStatus.ne(status))
    