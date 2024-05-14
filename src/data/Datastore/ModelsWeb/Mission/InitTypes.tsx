import { DsRole } from "../../../../models";
import { TextInit } from "../Base/InitTypes";


export type MissionInit = {
  yearOfConcours: string,
  role: DsRole,
  roleDisplayName?: TextInit,
  sort?: number
}

