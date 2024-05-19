import { useState } from "react"
import { DsPerformance } from "../../models"
import { RMusicPieceLabel } from "../BasicRendering/RMusicPiece"
import { PerformedConstituent, StagedPerformance } from "./RAuditionScreen"
import { RPerformanceParts, RStagedPerformance } from "../BasicRendering/RenderPerformance"
import { MyBox } from "../Base/MyBox"
import { RIconButton } from "../Base/Buttons"
import { SubTitle } from "../Base/Base"
import { getDsPerformance } from "../../data/Datastore/ModelsCommon/Performance/PerformanceR"
import { DataStore } from "@aws-amplify/datastore"
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit"
import { EVideoLink } from "./Types"
import { EConstituent } from "./Types"
import { Styling } from "../Base/StylingConstants"
import { stageVideoLink } from "./EditVideoLink"
import { EditVideoLink } from "./EditVideoLink"

type RVideoLinksProps = {
  performances: StagedPerformance[]
  onCancel: () => void
  onDbSave: () => void
}

export function RVideoLinks({performances, onCancel, onDbSave}: RVideoLinksProps) {
  return(
    <div>
      <SubTitle title="Edit Video Links" />
      {
        performances.map((cp: StagedPerformance, i: number) => {
          return(
              <div key={"chosen-piece-"+i}>
                <RVideoLinksHelper performance={cp} onDbSave={onDbSave} />
              </div>
            )
          }
        )
      }
      <RIconButton icon="go-back" onClick={onCancel} />
    </div>
  );
}

function RVideoLinksHelper({performance, onDbSave}: {performance: StagedPerformance, onDbSave: () => void}) : JSX.Element {
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
            onSubmit={async (ec: EConstituent[]) => {
              await updateVideoLinkConstituentCase(performance.id, ec);
              onDbSave();
            }}
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
              onSubmit={async (vl: EVideoLink) => {
                await updateVideoLinkNoConstituentCase(performance.id, vl);
                onDbSave();
              }}
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

        <EditVideoLink 
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
    const clone = [...eConstituents];
    clone.splice(i, 1, {...ec, videoLink: newVideoLink});
    setEConstituents(clone);
  }

  const updateVideoLinkStartTime = (i: number, newStartTime: number | null) => {
    const ec = eConstituents[i];
    const newVideoLink = {videoId: ec.videoLink.videoId, startTimeInSeconds: newStartTime || 0};
    const clone = [...eConstituents];
    clone.splice(i, 1, {...ec, videoLink: newVideoLink});
    setEConstituents(clone);
  }

  return(
    <div>
      <RMusicPieceLabel musicPiece={musicPiece} />

      {eConstituents.map((constituent: EConstituent, i: number) => 
          <div>
            <div>{constituent.displayId}</div>  {/* Note: for constituents, displayId is the same as displayName */}
            <EditVideoLink 
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

function stageEConstituent(constituent: PerformedConstituent) : EConstituent {
  const {displayId, videoLink} = constituent;
  return { displayId, videoLink: stageVideoLink(videoLink)};
}

