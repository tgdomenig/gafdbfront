import { Divider, Select } from "antd";
import { useEffect, useState } from "react";
import { RoundDisplayIdType, RoundDisplayIds, getCompetitors } from "../Base/Helpers";
import { DsMusicPiece, DsParticipation, DsPerformance, DsPerformedConstituent } from "../../models";
import { getDsPerformances } from "../../data/Datastore/ModelsCommon/Performance/PerformanceR";
import { xGetStaged } from "../../data/Datastore/ModelsCommon/Base/xGetStaged";
import { getDsMusicPiece } from "../../data/Datastore/ModelsCommon/MusicPiece/MusicPieceR";
import { MusicPiece, stageMusicPiece } from "./StageMusicPiece";
import { ENGLISH } from "../../util/common/language";
import { filteredMapAsync, mapAsync } from "../../util/common/general/collections";
import { getRoundRepertoireStaged } from "./GetMusicPieces";
import { Styling } from "../Base/StylingConstants";
import { RChosenPiecesForm } from "../Forms/RChosenPiecesForm";
import { PerformanceInit } from "../../data/Datastore/ModelsWeb/Performance/InitTypes";

/**
 * Auswahl der aktuellen Runde
 * Lädt die Competitors und das Repertoire dieser Runde
 * Auswahl eines Competitors und Anzeige dessen bereits definierten Performances
 * Ruft das Performance-Formular auf, in dem weitere Performances des Competitors eingegeben werden können
 * 
 */
export function RAuditionEditor() {
  const lg = ENGLISH;

  const [currentRound, setCurrentRound] = useState<RoundDisplayIdType | "">("");
  const [competitors, setCompetitors] = useState<DsParticipation[]>([]);
  const [repertoire, setRepertoire] = useState<MusicPiece[]>([]);

  const [currentCompetitor, setCurrentCompetitor] = useState<DsParticipation|undefined>(undefined);
  const [chosenPieces, setChosenPieces] = useState<EChosenPiece[]>([])

  const updateCurrentCompetitor = (did: string) => {
    setCurrentCompetitor(competitors.find(comp => comp.displayId === did));
  }

  useEffect(() => {
    const load = async () => {
      if (currentRound) {
        const currentCompetitors = await getCompetitors(currentRound);
        const musicPieces = await getRoundRepertoireStaged(lg, currentRound);
        setCompetitors(currentCompetitors)
        setCurrentCompetitor(undefined);
        setRepertoire(musicPieces);
      }
    }
    load();
  },
  [currentRound]);

  useEffect(() => {
    const load = async () => {
      if (currentRound && currentCompetitor) {
        const pfs = await getDsPerformances({competitorId: currentCompetitor.id});

        const stagedPieces = await filteredMapAsync<DsPerformance, EChosenPiece>(async (performance: DsPerformance) => {
            return await stageChosenPiece(performance);
          },
          pfs
        );
        setChosenPieces(stagedPieces)
      }
    }
    load();
  }, [currentCompetitor]);

  return(
    <div>

      <div>
      <Select
          style={{width: Styling.SELECT_WIDTH}}
          onChange={(round) => { setCurrentRound(round); }}
          options={RoundDisplayIds.map(did => ({value: did, label: did}))
          }
      />
      </div>

      {currentRound && competitors.length > 0
        ? <div>
            <Select
              value={currentCompetitor ? currentCompetitor.displayId : ""}
              style={{width: Styling.SELECT_WIDTH}}
              onChange={(competitor: string) => { updateCurrentCompetitor(competitor); }}
              options={competitors.map(c => ({value: c.displayId, label: c.displayId}))}
            />
          </div>
        : <div />
      }

      {currentCompetitor
        ? <RChosenPiecesForm
              chosenPieces={chosenPieces}
              repertoire={repertoire}
              onSubmit={ (performance: EChosenPiece) => {} }
          />
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

async function stageChosenPiece(performance: DsPerformance) : Promise<EChosenPiece|undefined> {

  const lg = ENGLISH;

  const {id, displayId, constituents} = performance;
  const musicPiece = await xGetStaged<DsMusicPiece, MusicPiece>(lg, getDsMusicPiece, performance.musicPieceId, stageMusicPiece);

  if (musicPiece) {
    return({
      id,
      displayId: displayId || "",
      musicPiece,
      chosenConstituentsDids: constituents ? constituents.map(c => c.displayId) : []
    }) as EChosenPiece  
  }

}

export type EChosenPiece = {
  id: string
  displayId: string
  musicPiece?: MusicPiece
  chosenConstituentsDids: string[]
}

export function newEChosenPiece() : EChosenPiece {
  return({
    id: "",
    displayId: "",
    chosenConstituentsDids: []
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
async function submitChosenPieces(competitorId: string, chosenPieces: EChosenPiece[]) {
  const dsPerformances = await getDsPerformances({competitorId});
  chosenPieces.map((chosenPiece: EChosenPiece) => {
    const {musicPiece, chosenConstituentsDids} = chosenPiece;
    if (musicPiece) {
      const displayId = musicPiece.displayId; // GENERATE NEW DISPLAY ID !!!!!
      const performance = dsPerformances.find((p: DsPerformance) => p.musicPieceId === musicPiece.id);
      let dsConstituents = performance && performance.constituents || [];
      return mergePerformance(displayId, musicPiece, chosenConstituentsDids, dsConstituents)
    }})
}

function mergePerformance(displayId: string, musicPiece: MusicPiece, constituentsDids: string[], dsConstituents: DsPerformedConstituent[]) : PerformanceInit {
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