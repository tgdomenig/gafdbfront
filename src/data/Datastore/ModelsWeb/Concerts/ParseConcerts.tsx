import {addDays, addHours, format} from 'date-fns'

import { GERMAN, FRENCH, LANGUAGE, ENGLISH } from '../../../../util/common/language';
import { ImageInit, TextInit } from '../Base/InitTypes';

import {ConcertDateInputFields, ConcertTimeInputFields, FetchedConcert, DsConcertInit, ConcertPerformer} from './InitTypes';
import { fetchFeaturedImage } from '../../Fetch/FetchData';
import { stageTime } from '../../ModelsCommon/Base/Staging';
import { parseDate } from '../../../../util/common/dateTime/Parse';
import { ManagedArtistsLookup } from '../../../../util/web/general/Globals';

// Note: In case of multiple dates or a range of dates, fetchedEvent can represent several concerts.
// This is why staceConcerts returns a list of staged concerts

export async function parseConcerts(fetchedConcerts: FetchedConcert[]) : Promise<DsConcertInit[]> {
  let result = [] as DsConcertInit[];
  for (var crt of fetchedConcerts) {
    const crts = await parseFetchedConcert(crt);
    result = [...result, ...crts];
  }
  return result;
}

export async function parseFetchedConcert(fetchedEvent: FetchedConcert) : Promise<DsConcertInit[]> {

  const {id, acf} = fetchedEvent;

  const datesOfPerformance = parseDates(acf);
  const times = parseTimes(acf);

  const managedArtists = parseArtists(acf.managed_artists);
//  const managedArtistIds = managedArtists && await findArtists(managedArtists);

  const conductor = _sanitize(acf.conductor);
  const performersFreetext = {
    en_US: acf.performers_freetext,
    fr_FR: acf.performers_freetext_fr,
    de_DE: acf.performers_freetext_de
  };

  const performers = [] as ConcertPerformer[]; // TODO

  const addPianist = acf.add_pianist;

  const program = {
    en_US: acf.program,
    fr_FR: acf.program_fr,
    de_DE: acf.program_de
  };

  const {lat: locationLat, lng: locationLng} = acf.location_map || {};

  const link = acf.link;

  const location = {
    en_US: acf.location,
    fr_FR: acf.location_fr,
    de_DE: acf.location_de
  };

  const orchestra = {
    en_US: acf.orchestra,
    fr_FR: acf.orchestra_fr,
    de_DE: acf.orchestra_de
  };

  const soloRecital = acf.solo_recital

    // concert title fields
  const title = acf.title;

  const titleFreetext = {
    en_US: acf.title_freetext,
    fr_FR: acf.title_freetext_fr,
    de_DE: acf.title_freetext_de
  };
  
  const sponsoredGAF = acf.sponsored_by_geza_anda_foundation;
  const sponsoredSteinway = acf.sponsored_by_steinway_sons;

  /*
  NOTE: Auf der Webseite kann aktuell nur ein "other sponsor" definiert werden. Dies kann aber ändern, weshalb wir hier mehrere zulassen.
  */
  let otherSponsors = [] as ImageInit[];
  if (acf.other_sponsor) {
    const img = await fetchFeaturedImage(acf.other_sponsor);
    if (img) {
      otherSponsors.push(img);
    }
  }

//  const otherSponsors = acf.other_sponsor ? [await fetchFeaturedImage(acf.other_sponsor)] : [];

  return datesOfPerformance.map((date: Date, i: number) => ({
    displayId: `Concert ${format(date, 'yyyy-MM-dd')} (${id} / ${i}): ${title}`,
    wpId: id.toString(),
    title,
    titleFreetext,
    managedArtists,
//    managedArtistIds,
    date: format(date, 'yyyy-MM-dd'),
    times,
    location,
    locationLat,
    locationLng,
    orchestra,
    soloRecital,
    conductor,
    performersFreetext,
    performers,
    addPianist,
    sponsoredGAF,
    sponsoredSteinway,
    otherSponsors,
    program,
    link
  }), datesOfPerformance);
}

function parseDates(dateSpec: ConcertDateInputFields): Date[] {

  const {acf_date, date_specification, end_of_date_range, more_dates} = dateSpec;
  
  let strDates = [] as string[];

  if (date_specification === "Date Range" && end_of_date_range && end_of_date_range > acf_date) {
    strDates = [acf_date, end_of_date_range];
  }
  else if (date_specification === "Multiple Dates" && more_dates && more_dates.length > 0) {
    strDates = [acf_date, ...more_dates.map(date_and_time => date_and_time.date)];
  }
  else { // "Single Date"
    strDates = [acf_date];
  }

  // const dates = strDates.map(str => {
  //   const strISO = (str.length == 8) ? str.slice(0,4) + '-' + str.slice(4,6) + '-' + str.slice(6) : str;
  //   return parseISO(strISO);
  // });

  const dates = strDates.map(parseDate).filter(el => (!! el)) as Date[];

//  console.log(dates);

  if (date_specification === "Date Range") {
    // add the dates between; if acf_date and end_of_date_range are inconsistent (i.e. end_of_date_range < acf_date), just treat as Single Date
    let d_0 = dates[0], d_1 = dates[1];
    let result = [d_0], d = d_0;
    while (true) {
      d = addDays(d,1);
      result = [...result, d];

      if (addHours(d,1) > d_1) {
        return result;
      }
    }
  }
  else {
    return dates;
  }
}

function parseTimes(timeSpec: ConcertTimeInputFields) : TextInit {
  return {
    en_US: _parseTimes(ENGLISH, timeSpec),
    de_DE: _parseTimes(GERMAN, timeSpec),
    fr_FR: _parseTimes(FRENCH, timeSpec)
  };
}

function _parseTimes(lg: LANGUAGE, timeSpec: ConcertTimeInputFields) : string {

  const {acf_time, time_specification, end_of_time_range, more_times} = timeSpec;

  const isValidTime = (value: string) => /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);

  if (! acf_time || acf_time === "" || ! isValidTime(acf_time)) {
    return "";
  }

  let strTimes = [];

  if (time_specification === "Time Range" && isValidTime(end_of_time_range) && end_of_time_range > acf_time) {
    strTimes = [acf_time, end_of_time_range];
  }
  else if (time_specification === "Multiple Times" && more_times && more_times.length > 0) {
    strTimes = [acf_time, ...more_times.map(t => t.time).filter(isValidTime)];
  }
  else { // "Single Time"
    strTimes = [acf_time];
  }

  const stagedTimes = strTimes.map(t => stageTime(lg, t)).filter(el => !! el);

  if (time_specification === "Time Range" && stagedTimes.length === 2) {
    const from = stagedTimes[0], to = stagedTimes[1];
    switch (lg) {
      case GERMAN: return `Von ${from} bis ${to}`;
      case FRENCH: return `De ${from} à ${to}`;
      default: return `From ${from} to ${to}`;
    }
  }
  else {
    return stagedTimes.join(", ");
  }
}

function _makeTextInit(strEN: string, strFR: string, strDE: string) :TextInit {
  return {en_US: strEN, fr_FR: strFR, de_DE: strDE};

}
function _stageTextInit(language: LANGUAGE, rawField: TextInit) {
  const effectiveField = rawField[language] == "" ? rawField[ENGLISH] : rawField[language];
  return effectiveField && _sanitize(effectiveField);
}

function parseArtists(managedArtists: string[] | undefined) : string[] {

  if (! managedArtists || managedArtists.length == 0) {
    return [];
  }
  else {
    return managedArtists.map(key => ManagedArtistsLookup.has(key) ? ManagedArtistsLookup.get(key) as string : key);
  }
}

/* Strings können '<br/>' oder '<strong>' directives enthalten.
'<br/>' werden hier durch '<br>' ersetzt und dann durch die css-Definition "white-space: pre-wrap"
als Newline dargestellt
*/
function _sanitize(s0: string) : string {
  if (! s0) {
    return '';
  }
  return s0.replace("<br/>", "\n").replace(/<strong>|<\/strong>/g, '');
}

/*
"location_map":{
  "address":"Kunsthalle Appenzell, Ziegeleistrasse, Appenzell, Switzerland",
  "lat":47.32577510000001,
  "lng":9.407753000000003,
  "zoom":14,
  "place_id":"ChIJw-09-GIhm0cRZJXTDc7lRI0",
  "name":"Kunsthalle Ziegelh\u00fctte",
  "street_number":14,
  "street_name":"Ziegeleistrasse",
  "city":"Appenzell",
  "state":"Appenzell Innerrhoden",
  "state_short":"AI",
  "post_code":9050,
  "country":"Switzerland",
  "country_short":"CH"}

*/



  // "orchestra": "Zürcher Symphoniker",
  // "orchestra_de": "",
  // "orchestra_fr": "Orchestre symphonique de Zurich",
  // "conductor": "Kevin Griffiths",
  // "add_pianist": true,
  // "program": "Grieg: Piano Concerto<br/>Tchaikovsky/Pletnev: exc. from the „Nutcracker Suite“",
  // "program_de": "Grieg: Klavierkonzert",
  // "program_fr": "Grieg : concerto pour piano<br/>Tchaïkovski/Pletnev : de la \"Suite de Casse-Noisette\".",
  // "performers": null,
  // "performers_freetext": "",
  // "performers_freetext_de": "",
  // "performers_freetext_fr": "",



/* ---- EXAMPLE Concert Data

{
    "id": 12952,
    "date": "2022-04-13T09:04:38",
    "date_gmt": "2022-04-13T07:04:38",
    "guid": {
      "rendered": "https://gaf.it-couture.ch/itc_cpt_concert/2022-01-02-claire_huangci/"
    },
    "modified": "2022-04-13T09:04:38",
    "modified_gmt": "2022-04-13T07:04:38",
    "slug": "2022-01-02-claire_huangci",
    "status": "publish",
    "type": "itc_cpt_concert",
    "link": "https://gaf.it-couture.ch/itc_cpt_concert/2022-01-02-claire_huangci/",
    "title": {
      "rendered": "2022-01-02 claire_huangci"
    },
    "content": {
      "rendered": "",
      "protected": false
    },
    "featured_media": 0,
    "template": "",
    "tags": [],
    "acf": {
      "managed_artists": [
        "claire_huangci"
      ],
      "title": "Managed Artist(s)",
      "title_freetext": "",
      "title_freetext_de": "",
      "title_freetext_fr": "",
      "date_specification": "Single Date",
      "acf_date": "20220102",
      "more_dates": null,
      "end_of_date_range": null,
      "time_specification": "Multiple Times",
      "acf_time": "11:00",
      "more_times": [
        {
          "time": "14:30"
        },
        {
          "time": "18:00"
        }
      ],
      "end_of_time_range": null,
      "location": "Tonhalle Zürich",
      "location_de": "",
      "location_fr": "Tonhalle de Zurich",
      "occasion": "",
      "occasion_de": "",
      "occasion_fr": "",
      "solo_recital": false,
      "orchestra": "Zürcher Symphoniker",
      "orchestra_de": "",
      "orchestra_fr": "Orchestre symphonique de Zurich",
      "conductor": "Kevin Griffiths",
      "add_pianist": true,
      "program": "Grieg: Piano Concerto<br/>Tchaikovsky/Pletnev: exc. from the „Nutcracker Suite“",
      "program_de": "Grieg: Klavierkonzert",
      "program_fr": "Grieg : concerto pour piano<br/>Tchaïkovski/Pletnev : de la \"Suite de Casse-Noisette\".",
      "performers": null,
      "performers_freetext": "",
      "performers_freetext_de": "",
      "performers_freetext_fr": "",
      "link": "",
      "sponsored_by_geza_anda_foundation": true,
      "sponsored_by_steinway_sons": false,
      "other_sponsor": null
    },
    "_links": {
      "self": [
        {
          "href": "https://gaf.it-couture.ch/wp-json/wp/v2/itc_cpt_concert/12952"
        }
      ],
      "collection": [
        {
          "href": "https://gaf.it-couture.ch/wp-json/wp/v2/itc_cpt_concert"
        }
      ],
      "about": [
        {
          "href": "https://gaf.it-couture.ch/wp-json/wp/v2/types/itc_cpt_concert"
        }
      ],
      "version-history": [
        {
          "count": 0,
          "href": "https://gaf.it-couture.ch/wp-json/wp/v2/itc_cpt_concert/12952/revisions"
        }
      ],
      "wp:attachment": [
        {
          "href": "https://gaf.it-couture.ch/wp-json/wp/v2/media?parent=12952"
        }
      ],
      "wp:term": [
        {
          "taxonomy": "post_tag",
          "embeddable": true,
          "href": "https://gaf.it-couture.ch/wp-json/wp/v2/tags?post=12952"
        }
      ],
      "curies": [
        {
          "name": "wp",
          "href": "https://api.w.org/{rel}",
          "templated": true
        }
      ]
    }
  },

*/