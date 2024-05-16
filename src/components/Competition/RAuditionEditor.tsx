import { useEffect, useState } from "react";
import { DsMusicPiece, DsParticipation, DsPerformance, DsPerformedConstituent } from "../../models";
import { getDsPerformances } from "../../data/Datastore/ModelsCommon/Performance/PerformanceR";
import { ENGLISH } from "../../util/common/language";
import { RChosenPiecesForm } from "../Forms/RChosenPiecesForm";
import { PerformanceInit } from "../../data/Datastore/ModelsWeb/Performance/InitTypes";
import { RPerformanceInit } from "../BasicRendering/RenderPerformance";
import { StagedPerformance } from "./RAuditions";
import { mapAsync } from "../../util/common/general/collections";

/**
 * Auswahl der aktuellen Runde
 * Lädt die Competitors und das Repertoire dieser Runde
 * Auswahl eines Competitors und Anzeige dessen bereits definierten Performances
 * Ruft das Performance-Formular auf, in dem weitere Performances des Competitors eingegeben werden können
 * 
 */
type RAuditionEditorProps = {
  competitor: DsParticipation
  performances: StagedPerformance[]
  repertoire: DsMusicPiece[],
  onCancel: () => void
}
export function RAuditionEditor({competitor, performances, repertoire, onCancel}: RAuditionEditorProps) {
  const lg = ENGLISH;

  const [chosenPieces, setChosenPieces] = useState<EChosenPiece[]>([]);
  const [savedPieces, setSavedPieces] = useState<PerformanceInit[]>([]); // CHANGE THIS TO DsPerformance[] !!!!!

  useEffect(() => {
    const load = async () => {
      if (performances) {
        setChosenPieces(await mapAsync(stageChosenPiece, performances));
      }
    }
    load();
  }, [performances])

  return(
    <div>

      {competitor && chosenPieces
        ? <RChosenPiecesForm
              chosenPieces={chosenPieces}
              repertoire={repertoire}
              onSubmit={async (chosenPieces: EChosenPiece[]) => {
                const tmpPieces = await submitChosenPieces(competitor.id, chosenPieces);
                setSavedPieces(tmpPieces);
              }}
              onCancel={onCancel}
          />
        : <div />
      }

      {savedPieces
        ? savedPieces.map((piece: PerformanceInit, i: number) => 
            <div><RPerformanceInit performanceInit={piece} /></div>
            )
        : <div />
      }

      {/* <Divider orientation="left">bereits in DB:</Divider> */}

      {/* {performances
        ? performances.map((pf: EPerformance, i: number) => 
            <div key={"pf-" + i}><RenderPerformance performance={pf} /></div>)
        : <div />
      } */}

    </div>
  );
}

export type EChosenPiece = {
  id: string
  displayId: string
  musicPiece?: DsMusicPiece
  chosenConstituentsDids: string[]
}

export function newEChosenPiece() : EChosenPiece {
  return({
    id: "",
    displayId: "",
    chosenConstituentsDids: []
  })
}

async function stageChosenPiece(performance: StagedPerformance) : Promise<EChosenPiece> {
  const {constituents} = performance;
  return({
    ...performance,
    chosenConstituentsDids: constituents ? constituents.map(c => c.displayId) : []
  })
}

/**
 * Es gibt hier verschiedene Fälle:
 * (*) Bereits bestehende Performances wurden umsortiert
 * (*) Bei bestehenden Performances wurde das Musikstück gewechselt
 * (*) Bestehende Performances wurden gelöscht
 * (*) Neue Performances wurden hinzugefügt
 * 
 * Die Update-Strategie ist wie folgt
 * (*) Die Reihenfolge wird von chosenPieces übernommen und durch die DisplayId definiert
 * (*) Video-Links werden übernommen, wenn die Musikstücke und Konstituenten immer noch ausgewählt sind
 */
async function submitChosenPieces(competitorId: string, chosenPieces: EChosenPiece[]) : Promise<PerformanceInit[]> { // !!!!!
  const dsPerformances = await getDsPerformances({competitorId});
  const result = chosenPieces.map((chosenPiece: EChosenPiece) => {
    const {musicPiece, chosenConstituentsDids} = chosenPiece;
    if (musicPiece) {
      const displayId = musicPiece.displayId; // GENERATE NEW DISPLAY ID !!!!!
      const performance = dsPerformances.find((p: DsPerformance) => p.musicPieceId === musicPiece.id);
      let dsConstituents = performance && performance.constituents || [];
      return mergePerformance(displayId, musicPiece, chosenConstituentsDids, dsConstituents)
  }});
  return result.filter(el => (!! el)) as PerformanceInit[]
}

function mergePerformance(displayId: string, musicPiece: DsMusicPiece, constituentsDids: string[], dsConstituents: DsPerformedConstituent[]) : PerformanceInit {
  return({
    displayId,
    piece: musicPiece.id,
    constituents: constituentsDids.map(did => {
      const dsConstituent = dsConstituents.find(c => c.displayId === did);
      if (dsConstituent) {
        const vl = dsConstituent.videoLink;

        let videoLink;
        if (vl) {
          const {platform, videoId, startTimeInSeconds} = dsConstituent.videoLink;
          if (platform && videoId && startTimeInSeconds) {
            videoLink = {
              platform: platform === "YOUTUBE" ? "YOUTUBE" : "VIMEO" as "YOUTUBE" | "VIMEO",
              videoId: videoId,
              startTimeInSeconds: startTimeInSeconds  
            }
          }
        }
        return({
          displayId: did,
          videoLink
        })
      }
      else {
        return { displayId: did }
      }
    })
  })
}


/*

import { VideoLinkInit } from "../../ModelsCommon/Performance/Types"

export type PerformanceInit = {
  displayId: string,
  piece: string,
  constituents?: PerformedConstituentInit[],
  videoLink?: VideoLinkInit
}

export type PerformedConstituentInit = {
  displayId: string
  videoLink?: VideoLinkInit
}

export type VideoLinkInit = {
  platform: "YOUTUBE" | "VIMEO"
  videoId: string
  startTimeInSeconds: number
}



------- DATASTORE --------
type DsPerformedConstituent {
  displayId: String!
  videoLink: VideoLink
}

type DsPerformance @model
  @aws_cognito_user_pools 
  @auth(
    rules: [
      { allow: groups, groups: ["Admin"], operations: [create, delete, read, update] }
      { allow: public, operations: [read] }
    ]
  )
{
  displayId: String
  musicPieceId: ID! @index(name: "byMusicPiece")
  videoLink: VideoLink
  constituents: [DsPerformedConstituent!]
  playedBy: ID! @index(name: "byCompetitor")
}

type VideoLink {
  platform: VideoPlatform
  videoId: String
  startTimeInSeconds: Int
}
*/