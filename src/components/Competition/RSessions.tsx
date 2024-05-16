import { useEffect, useState } from "react";
import { DsSession } from "../../models";
import { RoundDisplayIdType } from "../Base/Helpers";
import { SelectRound } from "./Base";
import { fGetDsSessions } from "../../data/Datastore/ModelsCommon/Session/SessionR";
import { ESession } from "../Forms/RSessionForm";
import { RSession } from "./RSession";


export function RSessions() {

  const [currentRoundDid, setCurrentRoundDid] = useState<RoundDisplayIdType|"">("");

  const [sessions, setSessions] = useState<ESession[]>([]);

  useEffect(() => {
    const load = async () => {
      if (currentRoundDid) {
        const currentSessions = await fGetDsSessions(currentRoundDid);
        setSessions(currentSessions.map(stageSession))
      }
    }
    load();
  },
  [currentRoundDid]);

  return(
    <div>
      <SelectRound onChange={(round) => { setCurrentRoundDid(round); }} />

      {currentRoundDid
        ? sessions.map((sn: ESession, i: number) => 
            <div style={{marginBottom: 20}} key={"session-" + i}>
              <RSession roundDid={currentRoundDid} session={sn} />
            </div>
          )
        : <div />
      }
    </div>
  )
}


function stageSession(dsSession: DsSession) : ESession{
  const {sessionName, displayId, date, start, end, competitors} = dsSession;
  console.log(date, start, end, typeof date, typeof start, typeof end)
  return {
    sessionName,
//    displayId,
    date: date ? new Date(date) : new Date(),
    start: date && start ? new Date(`${date}T${start}`) : new Date(),
    end: date && end ? new Date(`${date}T${end}`) : new Date(),
    competitors: competitors || [] 
  }
}
