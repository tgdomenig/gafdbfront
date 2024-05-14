// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const DsPublicationStatus = {
  "DRAFT": "DRAFT",
  "SUBMITTED": "SUBMITTED",
  "PUBLISHED": "PUBLISHED"
};

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

const VideoPlatform = {
  "YOUTUBE": "YOUTUBE",
  "VIMEO": "VIMEO"
};

const { ConfigItem, DsPost, DsPerson, DsMission, DsParticipation, DsGenericItem, DsShortPost, DsConcours, DsConcoursPrize, DsConcoursRound, DsSession, DsMusicPiece, DsPerformance, DsConcert, DsRecording, DsMusicAlbum, DsNotificationRecipient, DsVoting, DsVote, PerformedConcert, ChosenPiece, RepertoirePiece, RecordingOnAlbum, DsPostSection, DsImage, DsLink, DsAttribute, DsMPConstituent, DsPerformedConstituent, VideoLink, TextField, LongTextField, IntegerRange, DsConcertPerformer } = initSchema(schema);

export {
  ConfigItem,
  DsPost,
  DsPerson,
  DsMission,
  DsParticipation,
  DsGenericItem,
  DsShortPost,
  DsConcours,
  DsConcoursPrize,
  DsConcoursRound,
  DsSession,
  DsMusicPiece,
  DsPerformance,
  DsConcert,
  DsRecording,
  DsMusicAlbum,
  DsNotificationRecipient,
  DsVoting,
  DsVote,
  PerformedConcert,
  ChosenPiece,
  RepertoirePiece,
  RecordingOnAlbum,
  DsPublicationStatus,
  DsPostType,
  DsLayoutVariant,
  DsLinkVariant,
  DsRole,
  VideoPlatform,
  DsPostSection,
  DsImage,
  DsLink,
  DsAttribute,
  DsMPConstituent,
  DsPerformedConstituent,
  VideoLink,
  TextField,
  LongTextField,
  IntegerRange,
  DsConcertPerformer
};