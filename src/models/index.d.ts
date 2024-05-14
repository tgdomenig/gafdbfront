import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier, CustomIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum DsPublicationStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  PUBLISHED = "PUBLISHED"
}

export enum DsPostType {
  GENERAL = "GENERAL",
  NEWS = "NEWS",
  UPDATE = "UPDATE",
  INTERVIEW = "INTERVIEW",
  PERFORMANCE = "PERFORMANCE",
  PHOTOS = "PHOTOS"
}

export enum DsLayoutVariant {
  MEDIA_TOP = "MEDIA_TOP",
  MEDIA_BELOW = "MEDIA_BELOW",
  MEDIA_RIGHT = "MEDIA_RIGHT",
  MEDIA_LEFT = "MEDIA_LEFT"
}

export enum DsLinkVariant {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  PDF = "PDF",
  EXTERNAL = "EXTERNAL",
  INTERNAL = "INTERNAL"
}

export enum DsRole {
  CANDIDATE = "CANDIDATE",
  JURY_MEMBER = "JURY_MEMBER",
  JURY_PRESIDENT = "JURY_PRESIDENT",
  SCREENING_JURY = "SCREENING_JURY",
  CONDUCTOR = "CONDUCTOR",
  OTHER = "OTHER"
}

export enum VideoPlatform {
  YOUTUBE = "YOUTUBE",
  VIMEO = "VIMEO"
}

type EagerDsPostSection = {
  readonly headline?: TextField | null;
  readonly subtitle?: TextField | null;
  readonly text?: LongTextField | null;
  readonly media?: DsLink[] | null;
  readonly layout?: DsLayoutVariant | keyof typeof DsLayoutVariant | null;
}

type LazyDsPostSection = {
  readonly headline?: TextField | null;
  readonly subtitle?: TextField | null;
  readonly text?: LongTextField | null;
  readonly media?: DsLink[] | null;
  readonly layout?: DsLayoutVariant | keyof typeof DsLayoutVariant | null;
}

export declare type DsPostSection = LazyLoading extends LazyLoadingDisabled ? EagerDsPostSection : LazyDsPostSection

export declare const DsPostSection: (new (init: ModelInit<DsPostSection>) => DsPostSection)

type EagerDsImage = {
  readonly sm?: string | null;
  readonly md: string;
  readonly alt?: TextField | null;
}

type LazyDsImage = {
  readonly sm?: string | null;
  readonly md: string;
  readonly alt?: TextField | null;
}

export declare type DsImage = LazyLoading extends LazyLoadingDisabled ? EagerDsImage : LazyDsImage

export declare const DsImage: (new (init: ModelInit<DsImage>) => DsImage)

type EagerDsLink = {
  readonly label: TextField;
  readonly link: TextField;
  readonly variant?: DsLinkVariant | keyof typeof DsLinkVariant | null;
  readonly sort?: number | null;
}

type LazyDsLink = {
  readonly label: TextField;
  readonly link: TextField;
  readonly variant?: DsLinkVariant | keyof typeof DsLinkVariant | null;
  readonly sort?: number | null;
}

export declare type DsLink = LazyLoading extends LazyLoadingDisabled ? EagerDsLink : LazyDsLink

export declare const DsLink: (new (init: ModelInit<DsLink>) => DsLink)

type EagerDsAttribute = {
  readonly key?: string | null;
  readonly value?: TextField | null;
}

type LazyDsAttribute = {
  readonly key?: string | null;
  readonly value?: TextField | null;
}

export declare type DsAttribute = LazyLoading extends LazyLoadingDisabled ? EagerDsAttribute : LazyDsAttribute

export declare const DsAttribute: (new (init: ModelInit<DsAttribute>) => DsAttribute)

type EagerDsMPConstituent = {
  readonly displayId: string;
  readonly displayName: TextField;
}

type LazyDsMPConstituent = {
  readonly displayId: string;
  readonly displayName: TextField;
}

export declare type DsMPConstituent = LazyLoading extends LazyLoadingDisabled ? EagerDsMPConstituent : LazyDsMPConstituent

export declare const DsMPConstituent: (new (init: ModelInit<DsMPConstituent>) => DsMPConstituent)

type EagerDsPerformedConstituent = {
  readonly displayId: string;
  readonly videoLink?: VideoLink | null;
}

type LazyDsPerformedConstituent = {
  readonly displayId: string;
  readonly videoLink?: VideoLink | null;
}

export declare type DsPerformedConstituent = LazyLoading extends LazyLoadingDisabled ? EagerDsPerformedConstituent : LazyDsPerformedConstituent

export declare const DsPerformedConstituent: (new (init: ModelInit<DsPerformedConstituent>) => DsPerformedConstituent)

type EagerVideoLink = {
  readonly platform?: VideoPlatform | keyof typeof VideoPlatform | null;
  readonly videoId?: string | null;
  readonly startTimeInSeconds?: number | null;
}

type LazyVideoLink = {
  readonly platform?: VideoPlatform | keyof typeof VideoPlatform | null;
  readonly videoId?: string | null;
  readonly startTimeInSeconds?: number | null;
}

export declare type VideoLink = LazyLoading extends LazyLoadingDisabled ? EagerVideoLink : LazyVideoLink

export declare const VideoLink: (new (init: ModelInit<VideoLink>) => VideoLink)

type EagerTextField = {
  readonly en_US: string;
  readonly de_DE: string;
  readonly fr_FR: string;
}

type LazyTextField = {
  readonly en_US: string;
  readonly de_DE: string;
  readonly fr_FR: string;
}

export declare type TextField = LazyLoading extends LazyLoadingDisabled ? EagerTextField : LazyTextField

export declare const TextField: (new (init: ModelInit<TextField>) => TextField)

type EagerLongTextField = {
  readonly en_US: string[];
  readonly de_DE: string[];
  readonly fr_FR: string[];
}

type LazyLongTextField = {
  readonly en_US: string[];
  readonly de_DE: string[];
  readonly fr_FR: string[];
}

export declare type LongTextField = LazyLoading extends LazyLoadingDisabled ? EagerLongTextField : LazyLongTextField

export declare const LongTextField: (new (init: ModelInit<LongTextField>) => LongTextField)

type EagerIntegerRange = {
  readonly start: number;
  readonly end: number;
}

type LazyIntegerRange = {
  readonly start: number;
  readonly end: number;
}

export declare type IntegerRange = LazyLoading extends LazyLoadingDisabled ? EagerIntegerRange : LazyIntegerRange

export declare const IntegerRange: (new (init: ModelInit<IntegerRange>) => IntegerRange)

type EagerDsConcertPerformer = {
  readonly name?: string | null;
  readonly instrument?: TextField | null;
}

type LazyDsConcertPerformer = {
  readonly name?: string | null;
  readonly instrument?: TextField | null;
}

export declare type DsConcertPerformer = LazyLoading extends LazyLoadingDisabled ? EagerDsConcertPerformer : LazyDsConcertPerformer

export declare const DsConcertPerformer: (new (init: ModelInit<DsConcertPerformer>) => DsConcertPerformer)

type EagerConfigItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ConfigItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId?: string | null;
  readonly data?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyConfigItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ConfigItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId?: string | null;
  readonly data?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ConfigItem = LazyLoading extends LazyLoadingDisabled ? EagerConfigItem : LazyConfigItem

export declare const ConfigItem: (new (init: ModelInit<ConfigItem>) => ConfigItem) & {
  copyOf(source: ConfigItem, mutator: (draft: MutableModel<ConfigItem>) => MutableModel<ConfigItem> | void): ConfigItem;
}

type EagerDsPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly postType?: DsPostType | keyof typeof DsPostType | null;
  readonly publicationStatus?: DsPublicationStatus | keyof typeof DsPublicationStatus | null;
  readonly publishDate?: string | null;
  readonly displayId: string;
  readonly title: TextField;
  readonly category?: string | null;
  readonly subcategory?: string | null;
  readonly tags?: string[] | null;
  readonly featuredImage?: DsImage | null;
  readonly excerpt?: LongTextField | null;
  readonly content?: DsPostSection[] | null;
  readonly sort?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly postType?: DsPostType | keyof typeof DsPostType | null;
  readonly publicationStatus?: DsPublicationStatus | keyof typeof DsPublicationStatus | null;
  readonly publishDate?: string | null;
  readonly displayId: string;
  readonly title: TextField;
  readonly category?: string | null;
  readonly subcategory?: string | null;
  readonly tags?: string[] | null;
  readonly featuredImage?: DsImage | null;
  readonly excerpt?: LongTextField | null;
  readonly content?: DsPostSection[] | null;
  readonly sort?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsPost = LazyLoading extends LazyLoadingDisabled ? EagerDsPost : LazyDsPost

export declare const DsPost: (new (init: ModelInit<DsPost>) => DsPost) & {
  copyOf(source: DsPost, mutator: (draft: MutableModel<DsPost>) => MutableModel<DsPost> | void): DsPost;
}

type EagerDsPerson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsPerson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly name: string;
  readonly origin?: DsGenericItem | null;
  readonly yearOfBirth?: string | null;
  readonly profileImage?: DsImage | null;
  readonly bio?: DsPostSection[] | null;
  readonly isUnderGafManagement?: boolean | null;
  readonly concerts?: PerformedConcert[] | null;
  readonly missions?: DsMission[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly dsPersonOriginId?: string | null;
}

type LazyDsPerson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsPerson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly name: string;
  readonly origin: AsyncItem<DsGenericItem | undefined>;
  readonly yearOfBirth?: string | null;
  readonly profileImage?: DsImage | null;
  readonly bio?: DsPostSection[] | null;
  readonly isUnderGafManagement?: boolean | null;
  readonly concerts: AsyncCollection<PerformedConcert>;
  readonly missions: AsyncCollection<DsMission>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly dsPersonOriginId?: string | null;
}

export declare type DsPerson = LazyLoading extends LazyLoadingDisabled ? EagerDsPerson : LazyDsPerson

export declare const DsPerson: (new (init: ModelInit<DsPerson>) => DsPerson) & {
  copyOf(source: DsPerson, mutator: (draft: MutableModel<DsPerson>) => MutableModel<DsPerson> | void): DsPerson;
}

type EagerDsMission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsMission, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly yearOfConcours: string;
  readonly personId: string;
  readonly concoursId: string;
  readonly role: DsRole | keyof typeof DsRole;
  readonly roleDisplayName?: TextField | null;
  readonly participations?: DsParticipation[] | null;
  readonly prizes?: DsConcoursPrize[] | null;
  readonly sort?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsMission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsMission, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly yearOfConcours: string;
  readonly personId: string;
  readonly concoursId: string;
  readonly role: DsRole | keyof typeof DsRole;
  readonly roleDisplayName?: TextField | null;
  readonly participations: AsyncCollection<DsParticipation>;
  readonly prizes: AsyncCollection<DsConcoursPrize>;
  readonly sort?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsMission = LazyLoading extends LazyLoadingDisabled ? EagerDsMission : LazyDsMission

export declare const DsMission: (new (init: ModelInit<DsMission>) => DsMission) & {
  copyOf(source: DsMission, mutator: (draft: MutableModel<DsMission>) => MutableModel<DsMission> | void): DsMission;
}

type EagerDsParticipation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsParticipation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly missionId: string;
  readonly concoursRoundId: string;
  readonly admittedToCompete?: boolean | null;
  readonly chosenRepertoire?: ChosenPiece[] | null;
  readonly performances?: DsPerformance[] | null;
  readonly sort?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsParticipation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsParticipation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly missionId: string;
  readonly concoursRoundId: string;
  readonly admittedToCompete?: boolean | null;
  readonly chosenRepertoire: AsyncCollection<ChosenPiece>;
  readonly performances: AsyncCollection<DsPerformance>;
  readonly sort?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsParticipation = LazyLoading extends LazyLoadingDisabled ? EagerDsParticipation : LazyDsParticipation

export declare const DsParticipation: (new (init: ModelInit<DsParticipation>) => DsParticipation) & {
  copyOf(source: DsParticipation, mutator: (draft: MutableModel<DsParticipation>) => MutableModel<DsParticipation> | void): DsParticipation;
}

type EagerDsGenericItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsGenericItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly category?: string | null;
  readonly textField?: TextField | null;
  readonly longTextField?: LongTextField | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsGenericItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsGenericItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly category?: string | null;
  readonly textField?: TextField | null;
  readonly longTextField?: LongTextField | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsGenericItem = LazyLoading extends LazyLoadingDisabled ? EagerDsGenericItem : LazyDsGenericItem

export declare const DsGenericItem: (new (init: ModelInit<DsGenericItem>) => DsGenericItem) & {
  copyOf(source: DsGenericItem, mutator: (draft: MutableModel<DsGenericItem>) => MutableModel<DsGenericItem> | void): DsGenericItem;
}

type EagerDsShortPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsShortPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly publicationStatus?: DsPublicationStatus | keyof typeof DsPublicationStatus | null;
  readonly publishDate?: string | null;
  readonly displayId: string;
  readonly category?: string | null;
  readonly textField?: TextField | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsShortPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsShortPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly publicationStatus?: DsPublicationStatus | keyof typeof DsPublicationStatus | null;
  readonly publishDate?: string | null;
  readonly displayId: string;
  readonly category?: string | null;
  readonly textField?: TextField | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsShortPost = LazyLoading extends LazyLoadingDisabled ? EagerDsShortPost : LazyDsShortPost

export declare const DsShortPost: (new (init: ModelInit<DsShortPost>) => DsShortPost) & {
  copyOf(source: DsShortPost, mutator: (draft: MutableModel<DsShortPost>) => MutableModel<DsShortPost> | void): DsShortPost;
}

type EagerDsConcours = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsConcours, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly yearOfConcours: string;
  readonly featuredImage?: DsImage | null;
  readonly text?: LongTextField | null;
  readonly rounds?: DsConcoursRound[] | null;
  readonly missions?: DsMission[] | null;
  readonly prizes?: DsConcoursPrize[] | null;
  readonly youtubeLink?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsConcours = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsConcours, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly yearOfConcours: string;
  readonly featuredImage?: DsImage | null;
  readonly text?: LongTextField | null;
  readonly rounds: AsyncCollection<DsConcoursRound>;
  readonly missions: AsyncCollection<DsMission>;
  readonly prizes: AsyncCollection<DsConcoursPrize>;
  readonly youtubeLink?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsConcours = LazyLoading extends LazyLoadingDisabled ? EagerDsConcours : LazyDsConcours

export declare const DsConcours: (new (init: ModelInit<DsConcours>) => DsConcours) & {
  copyOf(source: DsConcours, mutator: (draft: MutableModel<DsConcours>) => MutableModel<DsConcours> | void): DsConcours;
}

type EagerDsConcoursPrize = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsConcoursPrize, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label: TextField;
  readonly missionId: string;
  readonly concoursId: string;
  readonly sort?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsConcoursPrize = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsConcoursPrize, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly label: TextField;
  readonly missionId: string;
  readonly concoursId: string;
  readonly sort?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsConcoursPrize = LazyLoading extends LazyLoadingDisabled ? EagerDsConcoursPrize : LazyDsConcoursPrize

export declare const DsConcoursPrize: (new (init: ModelInit<DsConcoursPrize>) => DsConcoursPrize) & {
  copyOf(source: DsConcoursPrize, mutator: (draft: MutableModel<DsConcoursPrize>) => MutableModel<DsConcoursPrize> | void): DsConcoursPrize;
}

type EagerDsConcoursRound = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsConcoursRound, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly roundNb?: string | null;
  readonly displayName: TextField;
  readonly concoursId: string;
  readonly sessions?: DsSession[] | null;
  readonly competitors?: DsParticipation[] | null;
  readonly repertoire?: RepertoirePiece[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsConcoursRound = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsConcoursRound, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly roundNb?: string | null;
  readonly displayName: TextField;
  readonly concoursId: string;
  readonly sessions: AsyncCollection<DsSession>;
  readonly competitors: AsyncCollection<DsParticipation>;
  readonly repertoire: AsyncCollection<RepertoirePiece>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsConcoursRound = LazyLoading extends LazyLoadingDisabled ? EagerDsConcoursRound : LazyDsConcoursRound

export declare const DsConcoursRound: (new (init: ModelInit<DsConcoursRound>) => DsConcoursRound) & {
  copyOf(source: DsConcoursRound, mutator: (draft: MutableModel<DsConcoursRound>) => MutableModel<DsConcoursRound> | void): DsConcoursRound;
}

type EagerDsSession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsSession, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly sessionName: string;
  readonly date?: string | null;
  readonly start?: string | null;
  readonly end?: string | null;
  readonly concoursRoundId?: string | null;
  readonly competitors?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsSession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsSession, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly sessionName: string;
  readonly date?: string | null;
  readonly start?: string | null;
  readonly end?: string | null;
  readonly concoursRoundId?: string | null;
  readonly competitors?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsSession = LazyLoading extends LazyLoadingDisabled ? EagerDsSession : LazyDsSession

export declare const DsSession: (new (init: ModelInit<DsSession>) => DsSession) & {
  copyOf(source: DsSession, mutator: (draft: MutableModel<DsSession>) => MutableModel<DsSession> | void): DsSession;
}

type EagerDsMusicPiece = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsMusicPiece, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly discographyId?: string | null;
  readonly composer?: string | null;
  readonly displayName: TextField;
  readonly opus?: string | null;
  readonly constituents?: (DsMPConstituent | null)[] | null;
  readonly inRepertoires?: RepertoirePiece[] | null;
  readonly chosenBy?: ChosenPiece[] | null;
  readonly performances?: DsPerformance[] | null;
  readonly recordings?: DsRecording[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsMusicPiece = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsMusicPiece, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly discographyId?: string | null;
  readonly composer?: string | null;
  readonly displayName: TextField;
  readonly opus?: string | null;
  readonly constituents?: (DsMPConstituent | null)[] | null;
  readonly inRepertoires: AsyncCollection<RepertoirePiece>;
  readonly chosenBy: AsyncCollection<ChosenPiece>;
  readonly performances: AsyncCollection<DsPerformance>;
  readonly recordings: AsyncCollection<DsRecording>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsMusicPiece = LazyLoading extends LazyLoadingDisabled ? EagerDsMusicPiece : LazyDsMusicPiece

export declare const DsMusicPiece: (new (init: ModelInit<DsMusicPiece>) => DsMusicPiece) & {
  copyOf(source: DsMusicPiece, mutator: (draft: MutableModel<DsMusicPiece>) => MutableModel<DsMusicPiece> | void): DsMusicPiece;
}

type EagerDsPerformance = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsPerformance, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId?: string | null;
  readonly musicPieceId: string;
  readonly videoLink?: VideoLink | null;
  readonly constituents?: DsPerformedConstituent[] | null;
  readonly playedBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly dsParticipationPerformancesId?: string | null;
  readonly dsMusicPiecePerformancesId?: string | null;
}

type LazyDsPerformance = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsPerformance, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId?: string | null;
  readonly musicPieceId: string;
  readonly videoLink?: VideoLink | null;
  readonly constituents?: DsPerformedConstituent[] | null;
  readonly playedBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly dsParticipationPerformancesId?: string | null;
  readonly dsMusicPiecePerformancesId?: string | null;
}

export declare type DsPerformance = LazyLoading extends LazyLoadingDisabled ? EagerDsPerformance : LazyDsPerformance

export declare const DsPerformance: (new (init: ModelInit<DsPerformance>) => DsPerformance) & {
  copyOf(source: DsPerformance, mutator: (draft: MutableModel<DsPerformance>) => MutableModel<DsPerformance> | void): DsPerformance;
}

type EagerDsConcert = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsConcert, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly wpId: string;
  readonly displayId: string;
  readonly publicationStatus?: DsPublicationStatus | keyof typeof DsPublicationStatus | null;
  readonly publishDate?: string | null;
  readonly title?: string | null;
  readonly titleFreetext?: TextField | null;
  readonly managedArtists?: PerformedConcert[] | null;
  readonly date: string;
  readonly times?: TextField | null;
  readonly location?: TextField | null;
  readonly locationLat?: number | null;
  readonly locationLng?: number | null;
  readonly orchestra?: TextField | null;
  readonly soloRecital?: boolean | null;
  readonly conductor?: string | null;
  readonly performersFreetext?: TextField | null;
  readonly performers?: DsConcertPerformer[] | null;
  readonly addPianist?: boolean | null;
  readonly sponsoredGAF?: boolean | null;
  readonly sponsoredSteinway?: boolean | null;
  readonly otherSponsors?: DsImage[] | null;
  readonly program?: TextField | null;
  readonly link?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsConcert = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsConcert, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly wpId: string;
  readonly displayId: string;
  readonly publicationStatus?: DsPublicationStatus | keyof typeof DsPublicationStatus | null;
  readonly publishDate?: string | null;
  readonly title?: string | null;
  readonly titleFreetext?: TextField | null;
  readonly managedArtists: AsyncCollection<PerformedConcert>;
  readonly date: string;
  readonly times?: TextField | null;
  readonly location?: TextField | null;
  readonly locationLat?: number | null;
  readonly locationLng?: number | null;
  readonly orchestra?: TextField | null;
  readonly soloRecital?: boolean | null;
  readonly conductor?: string | null;
  readonly performersFreetext?: TextField | null;
  readonly performers?: DsConcertPerformer[] | null;
  readonly addPianist?: boolean | null;
  readonly sponsoredGAF?: boolean | null;
  readonly sponsoredSteinway?: boolean | null;
  readonly otherSponsors?: DsImage[] | null;
  readonly program?: TextField | null;
  readonly link?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsConcert = LazyLoading extends LazyLoadingDisabled ? EagerDsConcert : LazyDsConcert

export declare const DsConcert: (new (init: ModelInit<DsConcert>) => DsConcert) & {
  copyOf(source: DsConcert, mutator: (draft: MutableModel<DsConcert>) => MutableModel<DsConcert> | void): DsConcert;
}

type EagerDsRecording = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsRecording, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly musicPieceId: string;
  readonly link?: string | null;
  readonly constituents?: DsPerformedConstituent[] | null;
  readonly recordingDate?: string | null;
  readonly recordingLocation?: TextField | null;
  readonly onAlbums?: RecordingOnAlbum[] | null;
  readonly mainPerformer?: string | null;
  readonly orchestra?: TextField | null;
  readonly conductor?: string | null;
  readonly otherParticipants?: TextField[] | null;
  readonly liveRecording?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly dsMusicPieceRecordingsId?: string | null;
}

type LazyDsRecording = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsRecording, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly musicPieceId: string;
  readonly link?: string | null;
  readonly constituents?: DsPerformedConstituent[] | null;
  readonly recordingDate?: string | null;
  readonly recordingLocation?: TextField | null;
  readonly onAlbums: AsyncCollection<RecordingOnAlbum>;
  readonly mainPerformer?: string | null;
  readonly orchestra?: TextField | null;
  readonly conductor?: string | null;
  readonly otherParticipants?: TextField[] | null;
  readonly liveRecording?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly dsMusicPieceRecordingsId?: string | null;
}

export declare type DsRecording = LazyLoading extends LazyLoadingDisabled ? EagerDsRecording : LazyDsRecording

export declare const DsRecording: (new (init: ModelInit<DsRecording>) => DsRecording) & {
  copyOf(source: DsRecording, mutator: (draft: MutableModel<DsRecording>) => MutableModel<DsRecording> | void): DsRecording;
}

type EagerDsMusicAlbum = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsMusicAlbum, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly album: string;
  readonly release: string;
  readonly attributes?: DsAttribute[] | null;
  readonly recordings?: RecordingOnAlbum[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsMusicAlbum = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsMusicAlbum, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly album: string;
  readonly release: string;
  readonly attributes?: DsAttribute[] | null;
  readonly recordings: AsyncCollection<RecordingOnAlbum>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsMusicAlbum = LazyLoading extends LazyLoadingDisabled ? EagerDsMusicAlbum : LazyDsMusicAlbum

export declare const DsMusicAlbum: (new (init: ModelInit<DsMusicAlbum>) => DsMusicAlbum) & {
  copyOf(source: DsMusicAlbum, mutator: (draft: MutableModel<DsMusicAlbum>) => MutableModel<DsMusicAlbum> | void): DsMusicAlbum;
}

type EagerDsNotificationRecipient = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<DsNotificationRecipient, 'notificationPushToken'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly notificationPushToken: string;
  readonly favourites?: string[] | null;
  readonly language?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsNotificationRecipient = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<DsNotificationRecipient, 'notificationPushToken'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly notificationPushToken: string;
  readonly favourites?: string[] | null;
  readonly language?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsNotificationRecipient = LazyLoading extends LazyLoadingDisabled ? EagerDsNotificationRecipient : LazyDsNotificationRecipient

export declare const DsNotificationRecipient: (new (init: ModelInit<DsNotificationRecipient>) => DsNotificationRecipient) & {
  copyOf(source: DsNotificationRecipient, mutator: (draft: MutableModel<DsNotificationRecipient>) => MutableModel<DsNotificationRecipient> | void): DsNotificationRecipient;
}

type EagerDsVoting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsVoting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly title: TextField;
  readonly isActive?: boolean | null;
  readonly description?: LongTextField | null;
  readonly choices?: TextField[] | null;
  readonly starts?: string | null;
  readonly terminates?: string | null;
  readonly votes?: DsVote[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDsVoting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsVoting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly displayId: string;
  readonly title: TextField;
  readonly isActive?: boolean | null;
  readonly description?: LongTextField | null;
  readonly choices?: TextField[] | null;
  readonly starts?: string | null;
  readonly terminates?: string | null;
  readonly votes: AsyncCollection<DsVote>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DsVoting = LazyLoading extends LazyLoadingDisabled ? EagerDsVoting : LazyDsVoting

export declare const DsVoting: (new (init: ModelInit<DsVoting>) => DsVoting) & {
  copyOf(source: DsVoting, mutator: (draft: MutableModel<DsVoting>) => MutableModel<DsVoting> | void): DsVoting;
}

type EagerDsVote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsVote, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly votingId: string;
  readonly choice?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly dsVotingVotesId?: string | null;
}

type LazyDsVote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DsVote, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly votingId: string;
  readonly choice?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly dsVotingVotesId?: string | null;
}

export declare type DsVote = LazyLoading extends LazyLoadingDisabled ? EagerDsVote : LazyDsVote

export declare const DsVote: (new (init: ModelInit<DsVote>) => DsVote) & {
  copyOf(source: DsVote, mutator: (draft: MutableModel<DsVote>) => MutableModel<DsVote> | void): DsVote;
}

type EagerPerformedConcert = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PerformedConcert, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dsPersonId?: string | null;
  readonly dsConcertId?: string | null;
  readonly dsPerson: DsPerson;
  readonly dsConcert: DsConcert;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPerformedConcert = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PerformedConcert, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dsPersonId?: string | null;
  readonly dsConcertId?: string | null;
  readonly dsPerson: AsyncItem<DsPerson>;
  readonly dsConcert: AsyncItem<DsConcert>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PerformedConcert = LazyLoading extends LazyLoadingDisabled ? EagerPerformedConcert : LazyPerformedConcert

export declare const PerformedConcert: (new (init: ModelInit<PerformedConcert>) => PerformedConcert) & {
  copyOf(source: PerformedConcert, mutator: (draft: MutableModel<PerformedConcert>) => MutableModel<PerformedConcert> | void): PerformedConcert;
}

type EagerChosenPiece = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChosenPiece, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dsParticipationId?: string | null;
  readonly dsMusicPieceId?: string | null;
  readonly dsParticipation: DsParticipation;
  readonly dsMusicPiece: DsMusicPiece;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChosenPiece = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChosenPiece, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dsParticipationId?: string | null;
  readonly dsMusicPieceId?: string | null;
  readonly dsParticipation: AsyncItem<DsParticipation>;
  readonly dsMusicPiece: AsyncItem<DsMusicPiece>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChosenPiece = LazyLoading extends LazyLoadingDisabled ? EagerChosenPiece : LazyChosenPiece

export declare const ChosenPiece: (new (init: ModelInit<ChosenPiece>) => ChosenPiece) & {
  copyOf(source: ChosenPiece, mutator: (draft: MutableModel<ChosenPiece>) => MutableModel<ChosenPiece> | void): ChosenPiece;
}

type EagerRepertoirePiece = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RepertoirePiece, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dsConcoursRoundId?: string | null;
  readonly dsMusicPieceId?: string | null;
  readonly dsConcoursRound: DsConcoursRound;
  readonly dsMusicPiece: DsMusicPiece;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRepertoirePiece = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RepertoirePiece, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dsConcoursRoundId?: string | null;
  readonly dsMusicPieceId?: string | null;
  readonly dsConcoursRound: AsyncItem<DsConcoursRound>;
  readonly dsMusicPiece: AsyncItem<DsMusicPiece>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RepertoirePiece = LazyLoading extends LazyLoadingDisabled ? EagerRepertoirePiece : LazyRepertoirePiece

export declare const RepertoirePiece: (new (init: ModelInit<RepertoirePiece>) => RepertoirePiece) & {
  copyOf(source: RepertoirePiece, mutator: (draft: MutableModel<RepertoirePiece>) => MutableModel<RepertoirePiece> | void): RepertoirePiece;
}

type EagerRecordingOnAlbum = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RecordingOnAlbum, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dsRecordingId?: string | null;
  readonly dsMusicAlbumId?: string | null;
  readonly dsRecording: DsRecording;
  readonly dsMusicAlbum: DsMusicAlbum;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecordingOnAlbum = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RecordingOnAlbum, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dsRecordingId?: string | null;
  readonly dsMusicAlbumId?: string | null;
  readonly dsRecording: AsyncItem<DsRecording>;
  readonly dsMusicAlbum: AsyncItem<DsMusicAlbum>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RecordingOnAlbum = LazyLoading extends LazyLoadingDisabled ? EagerRecordingOnAlbum : LazyRecordingOnAlbum

export declare const RecordingOnAlbum: (new (init: ModelInit<RecordingOnAlbum>) => RecordingOnAlbum) & {
  copyOf(source: RecordingOnAlbum, mutator: (draft: MutableModel<RecordingOnAlbum>) => MutableModel<RecordingOnAlbum> | void): RecordingOnAlbum;
}