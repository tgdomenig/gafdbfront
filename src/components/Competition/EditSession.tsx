
import { useEffect, useState } from "react";
import { RoundDisplayIdType, competitor2CandidateDid, getCompetitors } from "../Base/Helpers";
import { DsParticipation } from "../../models";
import { ESession, RSessionForm } from "../Forms/RSessionForm";


/**
 * Auswahl der aktuellen Runde
 * Lädt die Competitors in dieser Runde und zeigt die bereits definierten Sessions an
 * Ruft das Sessions-Formular auf
 * 
 */

type RSessionEditorProps = {
  roundDid: RoundDisplayIdType, 
  session: ESession,
  onSubmit: (s: ESession) => void
  onCancel: () => void
}
export function EditSession({roundDid, session, onSubmit, onCancel}: RSessionEditorProps) {

  console.log("session:", session)

  const [competitors, setCompetitors] = useState<DsParticipation[]>([]);

  useEffect(() => {
    const load = async () => {
      if (roundDid) {
        const currentCompetitors = await getCompetitors(roundDid);
        setCompetitors(currentCompetitors)
      }
    }
    load();
  },
  [roundDid]);

  if (competitors) {
    return(
        <RSessionForm 
          session={session}
          roundDid={roundDid} 
          eligibleCompetitors={competitors.map(c => competitor2CandidateDid(c.displayId))}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
    );
  }
  else {
    return <div />;
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
