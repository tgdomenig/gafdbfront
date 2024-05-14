import { ImageInit, LongTextInit, TextInit } from "../Base/InitTypes";

export type RoleInit = {
  name: string,
  sort?: number | null
  displayName?: TextInit,
}

export type ConcoursInit = {
  yearOfConcours: string
  text?: LongTextInit,
  featuredImage?: ImageInit,
}

export type ConcoursRoundInit = {
  displayId: string,
  displayName: TextInit,
  concoursId: string
}
