import { useEffect, useState } from "react";
import { DsSession } from "../../models";
import { RoundDisplayIdType } from "../Base/Helpers";
import { SelectRound } from "./Base";
import { fGetDsSessions } from "../../data/Datastore/ModelsCommon/Session/SessionR";
import { ESession } from "../Forms/RSessionForm";
import { RSession } from "./RSession";
import { Card } from "antd";
import { PageTitle } from "../Base/Base";


export function RSessionsScreen() {

  const [currentRoundDid, setCurrentRoundDid] = useState<RoundDisplayIdType|"">("");

  const [sessions, setSessions] = useState<ESession[]>([]);
  const [triggerReload, setTriggerReload] = useState(false);


  useEffect(() => {
    const load = async () => {
      if (currentRoundDid) {
        const currentSessions = await fGetDsSessions(currentRoundDid);
        setSessions(currentSessions.map(stageSession))
      }
    }
    load();
  },
  [currentRoundDid, triggerReload]);

  return(
    <div>
            <PageTitle title="Sessions" />

      <SelectRound onChange={(round) => { setCurrentRoundDid(round); }} />

      <Card title="Note" bordered={false} size="small" style={{marginBottom: 20}}>
          The number of sessions is fixed and cannot be changed here, i.e., sessions cannot be added or deleted.
          If the need for adding or deleting sessions arises, contact me...
      </Card>


      {currentRoundDid
        ? sessions.map((sn: ESession, i: number) => 
            <div style={{marginBottom: 20}} key={"session-" + i}>
              <RSession roundDid={currentRoundDid} session={sn} onDbSave={() => { setTriggerReload(! triggerReload); }} />
            </div>
          )
        : <div />
      }
    </div>
  )
}


function stageSession(dsSession: DsSession) : ESession {
  const {id, sessionName, displayId, date, start, end, competitors} = dsSession;

  /*
  Beachte: date ist AWSDate (d.h. ohne Zeit), und start und end sind AWSTime (d.h. ohne Datum).
  Beachte auch Date-Konstruktor: wenn nur aus Datum, so wird UTC-Zeit genommen mit Zeit = 00:00:00, wenn Datum und Zeit Local time vom Device, s. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  */

  return {
    id,
    displayId,
    sessionName,
    date: date ? new Date(date) : new Date(),
    start: date && start ? new Date(`${date}T${start}`) : new Date(),
    end: date && end ? new Date(`${date}T${end}`) : new Date(),
    competitors: competitors || [] 
  }
}
