
import { DsLayoutVariant, DsLinkVariant } from "../../../../models";

export type LayoutVariantType = DsLayoutVariant | keyof typeof DsLayoutVariant; 

export type MediaVariantType = DsLinkVariant | keyof typeof DsLinkVariant;

export type GafLink = {
  link: string,
  variant?: MediaVariantType | null,
  sort?: number | null
  label: string,
}

export type GafImage = {
  sm?: string,
  md: string,
  alt?: string
}

export type GafPostMeta = {
  displayId: string,
  category?: string | null,
  subcategory?: string | null,
  tags?: string[] | null,
  publishDate?: string | null,
  sort?: number | null,
  updatedAt: string
}

export type GafPostBase = {
  featuredImage?: GafImage,
  title: string,
  subtitle?: string | null,
}

export type PersonCoreFields = {
  displayId: string,
  name: string,
  origin?: string,
  yearOfBirth?: string,
  profileImage?: GafImage,
  isUnderGafManagement?: boolean,
  gafManagementSort?: number,
  updatedAt: string
}

export type HyperText = HyperTextPart[];

export type HyperTextPart = {
  text: string,
  url?: string
}
