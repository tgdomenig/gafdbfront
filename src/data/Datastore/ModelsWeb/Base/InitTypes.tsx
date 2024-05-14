import { DsPublicationStatus } from "../../../../models"
import { MediaVariantType } from "../../ModelsCommon/Base/CommonTypes"

export type CountryInit = {
  displayId: string,
  name: TextInit
}

export type GenericItemInit = {
  displayId: string,
  category?: string,
  textField?: TextInit,
  longTextField?: LongTextInit
}

export type ShortPostInit = {
  displayId: string,
  category: string,
  publishDate: string,
  publicationStatus: DsPublicationStatus,
  textField?: TextInit
}

export type GafLinkInit = {
  link: TextInit,
  variant?: MediaVariantType,
  sort?: number
  label: TextInit
}

// export type MediaVariant = "image" | "video" | "pdf";
// export const LinkVariants = ["image", "video", "pdf"];

/* ----------- Text / LongText ------------- */
export type TextInit = {
  en_US: string,
  fr_FR: string,
  de_DE: string
}

export type LongTextInit = {
  en_US: string[],
  fr_FR: string[],
  de_DE: string[]
}

export type ImageInit = {
  sm?: string,
  md: string,
  alt?: TextInit
}