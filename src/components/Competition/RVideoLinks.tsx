import { useState } from "react"
import { DsPerformance, VideoLink } from "../../models"
import { RMusicPieceLabel } from "../BasicRendering/RMusicPiece"
import { PerformedConstituent, StagedPerformance } from "./RAuditions"
import { RPerformanceParts, RStagedPerformance } from "../BasicRendering/RenderPerformance"
import { MyBox } from "../Base/MyBox"
import { RIconButton } from "../Base/Buttons"
import { Input, InputNumber } from "antd"
import { SubTitle } from "../Base/Base"
import { getDsPerformance } from "../../data/Datastore/ModelsCommon/Performance/PerformanceR"
import { DataStore } from "@aws-amplify/datastore"
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit"
import { EVideoLink } from "./Types"
import { EConstituent } from "./Types"
import { Styling } from "../Base/StylingConstants"

type RVideoLinksProps = {
  performances: StagedPerformance[]
  onCancel: () => void
}

export function RVideoLinks({performances, onCancel}: RVideoLinksProps) {
  return(
    <div>
      <SubTitle title="Edit Video Links" />
      {
        performances.map((cp: StagedPerformance, i: number) => {
          return(
              <div key={"chosen-piece-"+i}>
                <RVideoLinksHelper performance={cp} />
              </div>
            )
          }
        )
      }
      <RIconButton icon="go-back" onClick={onCancel} />
    </div>
  );
}

async function updateVideoLinkNoConstituentCase(id: string, videoLink: EVideoLink) {
  let original = await getDsPerformance(id);
  if (original) {
    const result = await DataStore.save(DsPerformance.copyOf(
      original,
      updated => {
          updated['videoLink'] = {platform: "YOUTUBE", ...videoLink};
      }
    ));
    return result;
  }
}

async function updateVideoLinkConstituentCase(id: string, constituents: EConstituent[]) {
  let original = await getDsPerformance(id);
  if (original) {
    const result = await DataStore.save(DsPerformance.copyOf(
      original,
      updated => {
          updated['constituents'] = constituents.map(c => ({
            displayId: c.displayId,
            videoLink: {platform: "YOUTUBE", ...c.videoLink}
          }));
      }
    ));
    return result;
  }
}

function RVideoLinksHelper({performance}: {performance: StagedPerformance}) : JSX.Element {
  const {musicPiece, constituents} = performance;
  const [isEditMode, setEditMode] = useState(false);

  if (! musicPiece) {
    return <div />;
  }
  else if (isEditMode) {
    if (constituents && constituents.length > 0) {
      return(
        <MyBox type="edit">
        <REditVideoLinksConstituentsCase 
            performance={performance}
            onSubmit={(ec: EConstituent[]) => updateVideoLinkConstituentCase(performance.id, ec)}
            onCancel={() => setEditMode(false)}
        />
        </MyBox>
      );
    }
    else {
      return(
        <MyBox type="edit">
          <REditVideoLinksNoConstituentsCase 
              performance={performance}
              onSubmit={(vl: EVideoLink) => updateVideoLinkNoConstituentCase(performance.id, vl)}
              onCancel={() => setEditMode(false)}
          />
        </MyBox>
      );
    }
  }
  else {
    return(
      <MyBox toTheRight={<RIconButton icon="edit-video" onClick={() => { setEditMode(true); } }/>} >
        <RStagedPerformance performance={performance} />
      </MyBox>
    )
  }
}

function REditVideoLinksNoConstituentsCase({performance, onSubmit, onCancel}: {
    performance: StagedPerformance, 
    onSubmit: (vl: EVideoLink) => void
    onCancel: () => void
  })
{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {musicPiece} = performance;

  const [videoLink, setVideoLink] = useState<{videoId: string, startTimeInSeconds: number}>(
    stageVideoLink(performance.videoLink));
  
  if (! musicPiece) {
    return <div />;
  }
  else {
    return(
      <div>
        <div style={{marginBottom: Styling.BIG_V_SPACE}}><RMusicPieceLabel musicPiece={musicPiece} /></div>
  
        <VideoLinkInputFields 
                videoLink={videoLink}
                onChangeVideoId={(videoId: string) => setVideoLink({...videoLink, videoId})}
                onChangeStartTime={(startTimeInSeconds: number) => setVideoLink({...videoLink, startTimeInSeconds})}
            />

        <ConfirmAndSubmit<{performance: StagedPerformance, videoLink: EVideoLink}>
            data={{performance, videoLink}}
            onSubmit={({videoLink}) => onSubmit(videoLink)}
            renderData={({performance, videoLink}) => 
                RPerformanceParts({musicPiece: performance.musicPiece, videoLink})}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onCancel={onCancel}
        />
      </div>
    );  
  }
}


function stageEConstituent(constituent: PerformedConstituent) : EConstituent {
  const {displayId, videoLink} = constituent;
  return { displayId, videoLink: stageVideoLink(videoLink)};
}

function stageVideoLink(vl?: VideoLink) : {videoId: string, startTimeInSeconds:number} {
  const videoId = (vl && vl.videoId) ? vl.videoId : "";
  const startTimeInSeconds = (vl && vl.startTimeInSeconds) ? vl.startTimeInSeconds : 0;
  return { videoId, startTimeInSeconds};
}

function REditVideoLinksConstituentsCase({performance, onSubmit, onCancel}: {
    performance: StagedPerformance,
    onSubmit: (ec: EConstituent[]) => void,
    onCancel: () => void
  })
{
  const {musicPiece, constituents} = performance;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [eConstituents, setEConstituents] = useState<EConstituent[]>(
    constituents ? constituents.map(stageEConstituent) : []
  );
  
  const updateVideoLinkId = (i: number, newVideoId: string) => {
    const ec = eConstituents[i];
    const newVideoLink = {videoId: newVideoId, startTimeInSeconds: ec.videoLink.startTimeInSeconds};
    setEConstituents(eConstituents.splice(i, 1, {displayId: ec.displayId, videoLink: newVideoLink}));
  }

  const updateVideoLinkStartTime = (i: number, newStartTime: number | null) => {
    const ec = eConstituents[i];
    const newVideoLink = {videoId: ec.videoLink.videoId, startTimeInSeconds: newStartTime || 0};
    setEConstituents(eConstituents.splice(i, 1, {displayId: ec.displayId, videoLink: newVideoLink}));
  }

  return(
    <div>
      <RMusicPieceLabel musicPiece={musicPiece} />

      {eConstituents.map((constituent: EConstituent, i: number) => 
          <div>
            <div>{constituent.displayId}</div>
            <VideoLinkInputFields 
                videoLink={constituent.videoLink}
                onChangeVideoId={(value: string) => updateVideoLinkId(i, value)}
                onChangeStartTime={(value: number) => updateVideoLinkStartTime(i, value)}
            />
          </div>
      )}

        <ConfirmAndSubmit 
            data={{performance, eConstituents}}
            onSubmit={({eConstituents}) => onSubmit(eConstituents)}
            renderData={({performance, eConstituents}) => 
                RPerformanceParts({musicPiece: performance.musicPiece, constituents: eConstituents})}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onCancel={onCancel}
        />

    </div>
  )
}

function VideoLinkInputFields({videoLink, onChangeVideoId, onChangeStartTime}: {
    videoLink: EVideoLink,
    onChangeVideoId: (value: string) => void,
    onChangeStartTime: (value: number) => void
}) 
{
  return(
    <div style={{display:'flex', flexDirection:"row"}}>
      <Input 
          addonBefore="Youtube video id:"
          placeholder="Youtube VideoId" 
          value={videoLink.videoId} 
          style={{width: 400}}
          onChange={(e) => onChangeVideoId(e.target.value)}
      />
      <InputNumber 
          addonBefore="start time (seconds):" 
          placeholder="start time in seconds" 
          value={videoLink.startTimeInSeconds} 
          style={{height: 32}}
          onChange={(value: number|null) => onChangeStartTime(value || 0)}
      />
    </div>
  );
}


 
/*
export function ConfirmAndSubmit<T>({data, onSubmit, onCancel, disabled, isModalOpen, setIsModalOpen, renderData}: ConfirmDialogProps<T>) {

*/

/*
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

*/