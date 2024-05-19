
import { useEffect, useState } from "react";
import { RoundDisplayIdType } from "../Base/Helpers";
import { ESession } from "../Forms/RSessionForm";
import { RenderESession } from "../BasicRendering/RSession";
import { MyBox } from "../Base/MyBox";
import { EditSession } from "./EditSession";
import { RIconButton } from "../Base/Buttons";
import { xSaveOrUpdate } from "../../data/Datastore/ModelsWeb/Base/xSaveOrUpdate";
import { getDsSession } from "../../data/Datastore/ModelsCommon/Session/SessionR";
import { DataStore } from "@aws-amplify/datastore";
import { DsSession } from "../../models";
import { SessionInit } from "../../data/Datastore/ModelsWeb/Session/InitTypes";
import { format } from "date-fns";
import { saveSession } from "../../data/Datastore/ModelsWeb/Session/SessionCUD";

/**
 * Auswahl der aktuellen Runde
 * Lädt die Competitors in dieser Runde und zeigt die bereits definierten Sessions an
 * Ruft das Sessions-Formular auf
 * 
 */
export function RSession({roundDid, session, onDbSave}: {roundDid: RoundDisplayIdType, session: ESession, onDbSave: () => void}) {

  const [isEditMode, setEditMode] = useState(false);


  const updateSession = async (session: ESession) => {

    const {id, date, start, end} = session;
    const sessionInit : SessionInit = {
      sessionName: "", // not used anymore
      date: format(date, "yyyy-MM-dd"),
      start: format(start, "hh:mm:ss"),
      end: format(end, "hh:mm:ss"),
      concoursRoundDisplayId: roundDid,
      competitors: session.competitors // SIND DAS DIE RICHTIGEN DISPLAY-IDS? !!!!!!
    }

    // Note: Sessions have a displayId (which is actually not used anymore). The displayId is created in saveSession and therefore missing in SessionInit.
    // Here, as a hack, we add the displayId to the interface to be able to use xSaveOrUpdate

    await xSaveOrUpdate<SessionInit & {displayId: string}, DsSession>(
      getDsSession,
      DsSession.copyOf,
      saveSession,
      session.id,
      {...sessionInit, displayId: ""}
    );
    onDbSave();
  }

  /*
export type SessionInit = {
  date: string,
  start: string,
  end: string,
  concoursRoundDisplayId: string,
  sessionName: string,
  competitors: string[]
}
  */


  useEffect(() => {
    setEditMode(false);
  }, [roundDid])

  if (isEditMode) {
    return(
      <EditSession 
          roundDid={roundDid}
          session={session}
          onSubmit={ (sn: ESession) => { updateSession(sn); setEditMode(false) } } // SAVE SESSION HERE !!!!!!
          onCancel={ () => { setEditMode(false) } }
      />
    );
  }
  else {
    return(
      <div>
        <MyBox toTheRight={<RIconButton icon="edit" onClick={() => { setEditMode(true); }} />}>
          <RenderESession session={session} />
        </MyBox>
      </div>
  );
  }
}


const ROUNDS = {
  "Concours 2024: Round One": [
        {
          "sessionName": "1",
          "date": "2024-05-30",
          "start": "09:00:00",
          "end": "10:30:00"
        },
        {
          "sessionName": "2",
          "date": "2024-05-30",
          "start": "11:00:00",
          "end": "12:30:00"
        },
        {
          "sessionName": "3",
          "date": "2024-05-30",
          "start": "14:00:00",
          "end": "15:30:00"
        },
        {
          "sessionName": "4",
          "date": "2024-05-30",
          "start": "16:00:00",
          "end": "17:30:00"
        },
        {
          "sessionName": "5",
          "date": "2024-05-31",
          "start": "09:00:00",
          "end": "10:30:00"
        },
        {
          "sessionName": "6",
          "date": "2024-05-31",
          "start": "11:00:00",
          "end": "12:30:00"
        },
        {
          "sessionName": "7",
          "date": "2024-05-31",
          "start": "14:00:00",
          "end": "15:30:00"
        },
        {
          "sessionName": "8",
          "date": "2024-05-31",
          "start": "16:00:00",
          "end": "17:30:00"
        },
        {
          "sessionName": "9",
          "date": "2024-06-01",
          "start": "09:00:00",
          "end": "10:30:00"
        },
        {
          "sessionName": "10",
          "date": "2024-06-01",
          "start": "11:00:00",
          "end": "12:30:00"
        },
        {
          "sessionName": "11",
          "date": "2024-06-01",
          "start": "14:00:00",
          "end": "15:30:00"
        },
        {
          "sessionName": "12",
          "date": "2024-06-01",
          "start": "16:00:00",
          "end": "17:30:00",
          "nbCompetitors": 3
        }
      ],
    "Concours 2024: Round Two": [
      {
        "sessionName": "1",
        "date": "2024-06-03",
        "start": "09:00:00",
        "end": "09:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "2",
        "date": "2024-06-03",
        "start": "10:00:00",
        "end": "10:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "3",
        "date": "2024-06-03",
        "start": "11:00:00",
        "end": "11:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "4",
        "date": "2024-06-03",
        "start": "14:00:00",
        "end": "14:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "5",
        "date": "2024-06-03",
        "start": "15:00:00",
        "end": "15:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "6",
        "date": "2024-06-03",
        "start": "16:00:00",
        "end": "16:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "1",
        "date": "2024-06-04",
        "start": "09:00:00",
        "end": "09:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "2",
        "date": "2024-06-04",
        "start": "10:00:00",
        "end": "10:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "3",
        "date": "2024-06-04",
        "start": "11:00:00",
        "end": "11:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "4",
        "date": "2024-06-04",
        "start": "14:00:00",
        "end": "14:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "5",
        "date": "2024-06-04",
        "start": "15:00:00",
        "end": "15:55:00",
        "nbCompetitors": 1
      },
      {
        "sessionName": "6",
        "date": "2024-06-04",
        "start": "16:00:00",
        "end": "16:55:00",
        "nbCompetitors": 1
      }
    ],
    "Concours 2024: Round Three": [
      {
        "sessionName": "Mozart-Semifinal I",
        "date": "2024-06-05",
        "start": "19:30:00",
        "end": "22:00:00",
        "nbCompetitors": 3
      },
      {
        "sessionName": "Mozart-Semifinal II",
        "date": "2024-06-06",
        "start": "19:30:00",
        "end": "22:00:00",
        "nbCompetitors": 3
      }
    ],
    "Concours 2024: Round Four": [
      {
        "sessionName": "Final Concert",
        "date": "2024-06-08",
        "start": "19:30:00",
        "end": "22:00:00",
        "nbCompetitors": 3
      }
    ]
}
