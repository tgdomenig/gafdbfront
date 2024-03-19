// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const DsPostType = {
  "GENERAL": "GENERAL",
  "NEWS": "NEWS",
  "UPDATE": "UPDATE",
  "INTERVIEW": "INTERVIEW",
  "PERFORMANCE": "PERFORMANCE",
  "PHOTOS": "PHOTOS"
};

const DsLayoutVariant = {
  "MEDIA_TOP": "MEDIA_TOP",
  "MEDIA_BELOW": "MEDIA_BELOW",
  "MEDIA_RIGHT": "MEDIA_RIGHT",
  "MEDIA_LEFT": "MEDIA_LEFT"
};

const DsLinkVariant = {
  "IMAGE": "IMAGE",
  "VIDEO": "VIDEO",
  "PDF": "PDF",
  "EXTERNAL": "EXTERNAL",
  "INTERNAL": "INTERNAL"
};

const DsRole = {
  "CANDIDATE": "CANDIDATE",
  "JURY_MEMBER": "JURY_MEMBER",
  "JURY_PRESIDENT": "JURY_PRESIDENT",
  "SCREENING_JURY": "SCREENING_JURY",
  "CONDUCTOR": "CONDUCTOR",
  "OTHER": "OTHER"
};

const { AppConfig, DsUser, DsUserFavourite, DsPost, DsPerson, DsMission, DsParticipation, DsGenericItem, DsConcours, DsConcoursPrize, DsConcoursRound, DsSession, DsMusicPiece, DsPerformance, DsConcert, DsRecording, DsMusicAlbum, DsVoting, PerformedConcert, ChosenPiece, RepertoirePiece, RecordingOnAlbum, DsPostSection, DsImage, DsLink, DsAttribute, DsMPConstituent, DsPerformedConstituent, TextField, LongTextField, IntegerRange, DsConcertPerformer, DsVote } = initSchema(schema);

export {
  AppConfig,
  DsUser,
  DsUserFavourite,
  DsPost,
  DsPerson,
  DsMission,
  DsParticipation,
  DsGenericItem,
  DsConcours,
  DsConcoursPrize,
  DsConcoursRound,
  DsSession,
  DsMusicPiece,
  DsPerformance,
  DsConcert,
  DsRecording,
  DsMusicAlbum,
  DsVoting,
  PerformedConcert,
  ChosenPiece,
  RepertoirePiece,
  RecordingOnAlbum,
  DsPostType,
  DsLayoutVariant,
  DsLinkVariant,
  DsRole,
  DsPostSection,
  DsImage,
  DsLink,
  DsAttribute,
  DsMPConstituent,
  DsPerformedConstituent,
  TextField,
  LongTextField,
  IntegerRange,
  DsConcertPerformer,
  DsVote
};