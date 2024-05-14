import { ImageInit, TextInit } from "../Base/InitTypes";

export type FetchedConcert = {
  id: string,
  acf: ConcertInputFields
}

export type ConcertInputFields = 
  ConcertDateInputFields 
  & ConcertTimeInputFields
  & ConcertLocationInputFields 
  & ConcertPerformersInputFields 
  & ConcertTitleInputFields
  & ConcertManagedArtitst 
  & ConcertProgramInputFields
  & ConcertSponsorsInputFields
  & {
    link: string
  };

export type DsConcertInit = {
  wpId: string,
  displayId: string,
  title: string,
  titleFreetext: TextInit,
  managedArtists: string[],
//  managedArtistIds?: (string | null)[], // undefined means artist couln't be found in Datastore
  date: string,
  times?: TextInit,
  location: TextInit,
  locationLat?: number,
  locationLng?: number,
  orchestra: TextInit,
  soloRecital: boolean,
  conductor: string,
  performersFreetext: TextInit,
  performers: ConcertPerformer[],
  addPianist: boolean,
  sponsoredGAF: boolean,
  sponsoredSteinway: boolean,
  otherSponsors: ImageInit[],
  program: TextInit,
  link: string
}

export type ConcertPerformer = {
  name: string,
  instrument: TextInit
}

export type ConcertDateInputFields = {
  acf_date: string,
  date_specification: string,
  more_dates: {date: string, time: string}[],
  end_of_date_range: string,  
}

export type ConcertTimeInputFields = {
  acf_time: string,
  time_specification: string,
  end_of_time_range: string,
  more_times: {time: string}[],
}

export type ConcertLocationInputFields = {
  location: string,
  location_de: string,
  location_fr: string,
  location_map: {lat: number, lng: number} | null,
}

export type ConcertPerformersInputFields = {
  orchestra: string,
  orchestra_de: string,
  orchestra_fr: string,
  conductor: string,
  performers_freetext: string,
  performers_freetext_de: string,
  performers_freetext_fr: string,
  performers: {
    name: string
    instrument_or_description: string,
    instrument_or_description_freetext?: string,
    instrument_or_description_freetext_de: string,
    instrument_or_description_freetext_fr: string,
  }[],
  add_pianist: boolean,
  solo_recital: boolean
}

export type ConcertTitleInputFields = {
  title: string,
  title_freetext: string
  title_freetext_de: string,
  title_freetext_fr: string
}

export type ConcertManagedArtitst = {
  managed_artists?: string[]
}

export type ConcertProgramInputFields = {
  program: string,
  program_de: string,
  program_fr: string,
}

export type ConcertSponsorsInputFields = {
  sponsored_by_geza_anda_foundation: boolean,
  sponsored_by_steinway_sons: boolean,
  other_sponsor: number | null
}

