
export type FetchResponse<FetchedType> = {
  jsonData: Promise<FetchedType>,
  error: string
}

export type FetchArgs = {
  endpoint: string
}

export type FetchResult<FetchedType> = {
  error?: string, 
  data?: FetchedType
}

export type FetchListResponse<FetchedType> = {
  totalPages: number,
  jsonData: Promise<FetchedType[]>,
  error: string
}

export type FetchListArgs = {
  endpoint: string,
  modifiedDate?: Date,
  startDate?: Date,
  startDateName?: string,
  perPage: number,
  order?: string,
  orderby?: string
}

export type FetchListResult<FetchedType> = {
  error?: string, 
  events?: FetchedType[]
}

