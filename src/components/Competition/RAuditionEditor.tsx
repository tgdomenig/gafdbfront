import { useEffect, useState } from "react";
import { DsMusicPiece, DsParticipation, DsPerformance, DsPerformedConstituent, VideoLink } from "../../models";
import { getDsPerformance, getDsPerformances } from "../../data/Datastore/ModelsCommon/Performance/PerformanceR";
import { ENGLISH } from "../../util/common/language";
import { RChosenPiecesForm } from "../Forms/RChosenPiecesForm";
import { StagedPerformance } from "./RAuditionScreen";
import { filteredMapAsync, mapAsync } from "../../util/common/general/collections";
import { filterNull } from "../Base/Base";
import { xDelete } from "../../data/Datastore/ModelsWeb/Base/xDelete";
import { DsPerformanceInit, saveDsPerformace, savePerformance } from "../../data/Datastore/ModelsWeb/Performance/PerformanceCUD";
import { itcAssert } from "../../util/common/general/tests";
import { xSaveOrUpdate } from "../../data/Datastore/ModelsWeb/Base/xSaveOrUpdate";
import { SIMULATION_MODE } from "../Base/StylingConstants";

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
  onDbSave: () => void,
  onCancel: () => void
}

export function RAuditionEditor({competitor, performances, repertoire, onDbSave, onCancel}: RAuditionEditorProps) {
  const lg = ENGLISH;

  const [chosenPieces, setChosenPieces] = useState<EChosenPiece[]>([]);

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
                await dbUpdatePerformances(competitor, chosenPieces);
                onDbSave();
              }}
              onCancel={onCancel}
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

async function dbUpdatePerformances(competitor: DsParticipation, chosenPieces: EChosenPiece[]) {

  const dsPerformances = await getDsPerformances({competitorId: competitor.id});

  // Delete performances which are no longer chosen
  for (var dsPerformance of dsPerformances) {
    if (! chosenPieces.find(chosenPiece => chosenPiece.musicPiece && chosenPiece.musicPiece.id === dsPerformance.musicPieceId)) {
      if (SIMULATION_MODE) {
        const perf = await getDsPerformance(dsPerformance.id);
        console.log("SIMULATION: Deleting Performance: ", JSON.stringify(perf));
      }
      else {
        await xDelete(getDsPerformance, dsPerformance.id);
      }
    }
  }
  
  let ix = 0;
  let result = chosenPieces.map((chosenPiece: EChosenPiece) => {
    const {musicPiece} = chosenPiece;
    if (musicPiece) {
      const displayId = competitor.displayId + '|Pf ' + ix;
      ix += 1;

      const dsPerformance = dsPerformances.find((p: DsPerformance) => p.musicPieceId === musicPiece.id);
      if (dsPerformance) {
        return mergeWithDsPerformance(displayId, musicPiece, chosenPiece, dsPerformance);
      }
      else {
        // Note: we pass musicPiece because in chosenPiece it is set as optional even though we know here that it's there
        return newPerformanceInit(competitor, displayId, musicPiece, chosenPiece);
      }
    }
  });

 
  return await filteredMapAsync<DsPerformanceInit, DsPerformance>(async (input: DsPerformanceInit) => {
      if (SIMULATION_MODE) {
        console.log("SIMULATION: Saving Performance: ", JSON.stringify(input));
      }
      else {

        // @ts-ignore
        await xSaveOrUpdate<DsPerformanceInit, DsPerformance>(
          getDsPerformance,
          DsPerformance.copyOf,
          saveDsPerformace,
          input.id,
          input,
          input.displayId
        );
      }
    },
    filterNull(result)
  );
}

function mergeWithDsPerformance(displayId: string, musicPiece: DsMusicPiece, chosenPiece: EChosenPiece, dsPerformance: DsPerformance) : DsPerformanceInit {

  const {chosenConstituentsDids} = chosenPiece;
  if (chosenConstituentsDids) {
    // Constituent case
    let constituentsInit;
    const dsConstituents = dsPerformance.constituents;
    if (dsConstituents) {
      constituentsInit = chosenConstituentsDids.map(did => {
        const constituent = dsConstituents.find(c => c.displayId === did);
        if (constituent) {
          const {videoLink} = constituent;
          return {
            displayId: did,
            videoLink: {...videoLink}
          }
        }
        return {displayId: did}
      });
    }
    else {
      // this should actually not happen because if a music piece has constituents, performances should always have them also
      constituentsInit = chosenConstituentsDids.map(did => ({displayId: did}));
    }
    return {
      id: dsPerformance.id, // wichtig! sonst wird save aufgerufen statt update
      displayId, 
      piece: musicPiece.displayId, 
      musicPieceId: musicPiece.id, 
      constituents: constituentsInit,
      playedBy: dsPerformance.playedBy
    };
  }
  else {
    // Non-constituents case
    const {videoLink} = dsPerformance;
    return {
      displayId, 
      piece: musicPiece.displayId, 
      musicPieceId: musicPiece.id, 
      videoLink: makeVideoLinkInit(videoLink),
      playedBy: dsPerformance.playedBy
    }
  }
}

function makeVideoLinkInit(videoLink: VideoLink | null | undefined) {
  if (videoLink) {
    const {platform, videoId, startTimeInSeconds} = videoLink;
    return {
      platform: platform === "YOUTUBE" ? "YOUTUBE" : "VIMEO" as "YOUTUBE" | "VIMEO",
      videoId: videoId || "",
      startTimeInSeconds: startTimeInSeconds || 0
    }
  }
}



function newPerformanceInit(competitor: DsParticipation, displayId: string, musicPiece: DsMusicPiece, chosenPiece: EChosenPiece) {
  const {chosenConstituentsDids} = chosenPiece;
  return {
    displayId,
    piece: musicPiece.displayId,
    constituents: chosenConstituentsDids ? chosenConstituentsDids.map(did => ({displayId: did})) : undefined,
    musicPieceId: musicPiece.id,
    playedBy: competitor.id
  }
}



/*

import { VideoLinkInit } from "../../ModelsCommon/Performance/Types"

export type EChosenPiece = {d
  id: string
  displayId: string
  musicPiece?: DsMusicPiece
  chosenConstituentsDids: string[]
}



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