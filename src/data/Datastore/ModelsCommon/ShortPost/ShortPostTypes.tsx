import { DsPublicationStatus } from "../../../../models";

export type ShortPostModifier = "txt" | "b" | "vl" | "wl";

export type ShortPostBlock = {
  modifier: ShortPostModifier
  newPar: boolean
  text: string
}

export type ShortPost = {
  id: string
  displayId: string
  category: string
  publicationStatus?: DsPublicationStatus
  publishDate: Date
  title: string
  blocks: ShortPostBlock[]
}

export type ShortPostFromJson = {
  publishDate: string
  title: string
  blocks: ShortPostBlock[]
}


