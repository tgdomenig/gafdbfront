
import { DsPublicationStatus } from '../../../../models';
import { GafPostMeta, LayoutVariantType } from '../../ModelsCommon/Base/CommonTypes';
import { TextInit, LongTextInit, GafLinkInit, ImageInit } from '../Base/InitTypes';

export type PostInit = GafPostMeta & {
  title: TextInit,
  excerpt?: LongTextInit,
  content?: PostSectionInit[],
  featuredImage?: ImageInit,
  publicationStatus: DsPublicationStatus,
  publishDate: string
}

export type PostSectionInit = {
  layout?: LayoutVariantType
  headline?: TextInit,
  subtitle?: TextInit,
  text?: LongTextInit,
  media?: GafLinkInit[]
}
