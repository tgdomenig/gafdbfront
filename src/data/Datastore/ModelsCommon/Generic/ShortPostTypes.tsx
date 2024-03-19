export const _CATEGORY_COUNTRY_ = "Short Post";
export const _CATEGORY_SHORT_POST_ = "Short Post";
export const _CATEGORY_EXPIRED_SHORT_POST_ = "Expired Short Post";

export type ShortPostModifier = "txt" | "b" | "vl" | "wl";

export type ShortPostBlock = {
  modifier: ShortPostModifier
  newPar: boolean
  text: string
}

export type ShortPost = {
  id: string
  isActive: boolean
  displayId: string
  publishDate: Date
  title: string
  blocks: ShortPostBlock[]
}

export type ShortPostFromJson = {
  publishDate: string
  title: string
  blocks: ShortPostBlock[]
}


