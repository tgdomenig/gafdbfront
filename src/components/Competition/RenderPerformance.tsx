import { DsPerformance, DsPerformedConstituent, VideoLink } from "../../models"
import { RBoldText } from "../Base/Base";
import { MyBox } from "../Base/MyBox";

import { MusicPiece } from "./StageMusicPiece";

/*

type RenderPerformanceProps = {
  performance: ChosenPiece
}
export function RenderPerformance({performance}: RenderPerformanceProps) {
  const {id, displayId, videoLink, constituents, musicPiece} = performance;

  return(
    <MyBox>
        <RMusicPiece musicPiece={musicPiece}/>
        <RVideoLink videoLink={videoLink} />

        {(constituents && constituents.length > 0)
          ? constituents.map((c: DsPerformedConstituent, i: number) => 
                <div key={"constituent-" + i}><RConstituent constituent={c} /></div>
            )
          : <div />
        }
    </MyBox>
  )

}
*/
function RMusicPiece({musicPiece}: {musicPiece: MusicPiece}) {
  return(
    <div style={{marginBottom: 4}}>
    <span><strong>{musicPiece.composer}</strong>: {musicPiece.displayName}</span>
    </div>
  )
}

function RConstituent({constituent}: {constituent: DsPerformedConstituent}) {
  const {displayId, videoLink} = constituent
  return(
    <div style={{marginBottom: 2}}>
      <RBoldText text={displayId} />
      <RVideoLink videoLink={videoLink} />
    </div>
  )

}

function RVideoLink({videoLink}: {videoLink?: VideoLink | null}) {
  if (! videoLink) {
    return <div />;
  }
  else {
    const {platform, videoId, startTimeInSeconds} = videoLink;
    return(
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>Platform: {platform}, </div>
        <div>VideoId: {videoId}, </div>
        <div>starts at: {startTimeInSeconds}</div>
      </div>
    )
  }
}