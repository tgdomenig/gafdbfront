
import { ImageInit } from "../Base/InitTypes";
import { PostSectionInit } from "../Post/InitTypes";


export type PersonCoreInit = {
  displayId: string,
  name: string,
  origin?: string,
  yearOfBirth?: string,
  profileImage?: ImageInit,
  isUnderGafManagement?: boolean,
  gafManagementSort?: number
}

export type PersonInit =  PersonCoreInit & {
  bio?: PostSectionInit[]
}