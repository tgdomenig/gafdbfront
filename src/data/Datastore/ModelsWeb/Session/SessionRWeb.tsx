import { DsParticipation, DsSession } from '../../../../models';
import { mapAsync } from '../../../../util/common/general/collections';
import { getDsSessions } from '../../ModelsCommon/Session/SessionR';


export async function getDsSessionsXpd(roundId: string): Promise<DsSessionXpd[]> {
  const dsSessions = await getDsSessions(roundId);
  return await mapAsync(async (dsSession: DsSession) => ({
    ...dsSession
  }),
    dsSessions);
}

export type DsSessionXpd = DsSession & {
  participationsXpd: DsParticipation[];
};

