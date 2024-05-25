import { useEffect, useState } from "react";
import { RAuditionEditor } from "./RAuditionEditor";
import { RoundDisplayIdType, getCompetitors } from "../Base/Helpers";
import { DsMusicPiece, DsParticipation, DsPerformance, VideoLink } from "../../models";
import { getRoundRepertoire, getRoundRepertoireStaged } from "./GetMusicPieces";
import { ENGLISH } from "../../util/common/language";
import { MusicPiece } from "./StageMusicPiece";
import { SelectRound } from "./Base";
import { Styling } from "../Base/StylingConstants";
import { Divider, Select } from "antd";
import { getDsPerformances } from "../../data/Datastore/ModelsCommon/Performance/PerformanceR";
import { filteredMapAsync } from "../../util/common/general/collections";
import { getDsMusicPiece } from "../../data/Datastore/ModelsCommon/MusicPiece/MusicPieceR";
import { RButton, RIconButton } from "../Base/Buttons";
import { MyBox } from "../Base/MyBox";
import { VideoCameraOutlined } from "@ant-design/icons";
import { RVideoLinks } from "./RVideoLinks";
import { RStagedPerformance } from "../BasicRendering/RenderPerformance";
import { PageTitle } from "../Base/Base";

export function RAuditionScreen() {
  const lg = ENGLISH;

  const [currentRoundDid, setCurrentRoundDid] = useState<RoundDisplayIdType | "">("");
  const [competitors, setCompetitors] = useState<DsParticipation[]>([]);
  const [repertoire, setRepertoire] = useState<DsMusicPiece[]>([]);

  const [currentCompetitor, setCurrentCompetitor] = useState<DsParticipation|undefined>(undefined);

  const updateCurrentCompetitor = (did: string) => {
    setCurrentCompetitor(competitors.find(comp => comp.displayId === did));
  }

  useEffect(() => {
    const load = async () => {
      if (currentRoundDid) {
        const currentCompetitors = await getCompetitors(currentRoundDid);
        const musicPieces = await getRoundRepertoire(currentRoundDid);
        setCompetitors(currentCompetitors)
        setCurrentCompetitor(undefined);
        setRepertoire(musicPieces);
      }
    }
    load();
  },
  [currentRoundDid]);



  return(
    <div>
      <PageTitle title="Auditions" />

      <SelectRound onChange={(round) => { setCurrentRoundDid(round) }} />

      {currentRoundDid && competitors.length > 0
        ? <div>
            <Select
              value={currentCompetitor ? currentCompetitor.displayId : ""}
              style={{minWidth: Styling.SCREEN_WIDTH}}
              onChange={(competitor: string) => { updateCurrentCompetitor(competitor); }}
              options={competitors.map(c => ({value: c.displayId, label: c.displayId}))}
            />
          </div>
        : <div />
      }

      {currentCompetitor
        ? <RAudition competitor={currentCompetitor} repertoire={repertoire} />
        : <div />
      }
    </div>
  )
}

type RAuditionProps = {
  competitor: DsParticipation,
  repertoire: DsMusicPiece[]
}

function RAudition({competitor, repertoire}: RAuditionProps) {

  const lg = ENGLISH;

  const [performances, setPerformances] = useState<StagedPerformance[]>([])
  const [mode, setMode] = useState<"show"|"edit"|"videolinks">("show")
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (competitor) {
        let stagedPieces = [] as StagedPerformance[];
        const pfs = await getDsPerformances({competitorId: competitor.id});
        if (pfs.length > 0) {
          stagedPieces = await filteredMapAsync<DsPerformance, StagedPerformance>(async (performance: DsPerformance) => {
              return await stageDsPerformance(performance);
            },
            pfs
          );
        }
        setPerformances(stagedPieces)
      }
      setMode("show");
    }
    load();
  }, [competitor, triggerReload]);

  if (mode === "edit") {
    return(
      <MyBox type="edit">
        <RAuditionEditor  
              competitor={competitor} 
              performances={performances} 
              repertoire={repertoire}
              onDbSave={() => { setTriggerReload(! triggerReload); }}
              onCancel={() => { setMode("show"); }} 
        />
      </MyBox>
    );
  }
  else if (mode === "show") {
    return(
      <MyBox 
        toTheRight={[
        <RIconButton icon="edit" onClick={() => { setMode("edit"); }} />,
        <RIconButton icon={"edit-video"} onClick={() => {setMode("videolinks")}}/>
      ]}>

        {performances.map((pf: StagedPerformance, i: number) =>
          <div key={"chosen-piece-"+i}>
            <RStagedPerformance performance={pf} />
            <Divider />
          </div>
        )}
      </MyBox>
    )
  }
  else {
    return(
      <RVideoLinks
          performances={performances}
          onCancel={() => { setMode("show"); }}
          onDbSave={() => { setTriggerReload(! triggerReload); }}
      />
    )
  }
}

export type StagedPerformance = {
  id: string
  displayId: string
  musicPiece: DsMusicPiece
  videoLink?: VideoLink
  constituents?: PerformedConstituent[]
}

export type PerformedConstituent = {
  displayId: string,
  videoLink?: VideoLink
}



async function stageDsPerformance(performance: DsPerformance) : Promise<StagedPerformance|undefined> {

  const lg = ENGLISH;

  const {id, displayId, musicPieceId, videoLink, constituents} = performance;
  const musicPiece = await getDsMusicPiece(musicPieceId);

  if (musicPiece) {
    return({
      id,
      displayId: displayId || "",
      videoLink: videoLink || undefined,
      musicPiece,
      constituents: constituents ? constituents.map(({displayId, videoLink}) => ({displayId, videoLink: videoLink || undefined})) : undefined
    })
  }
}
