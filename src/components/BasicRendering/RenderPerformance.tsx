import { useState, useEffect } from "react";
import { getDsMusicPiece, fGetDsMusicPiece } from "../../data/Datastore/ModelsCommon/MusicPiece/MusicPieceR";
import { VideoLinkInit } from "../../data/Datastore/ModelsCommon/Performance/Types";
import { PerformanceInit, PerformedConstituentInit } from "../../data/Datastore/ModelsWeb/Performance/InitTypes";
import { DsMusicPiece, DsPerformance, DsPerformedConstituent, VideoLink } from "../../models"
import { RBoldText } from "../Base/Base";
import { RDsMusicPiece, RMusicPieceLabel } from "./RMusicPiece";

import { ENGLISH } from "../../util/common/language";
import { StagedPerformance } from "../Competition/RAuditions";
import { MusicPiece } from "../Competition/StageMusicPiece";
import { Styling } from "../Base/StylingConstants";
import { EConstituent, EVideoLink } from "../Competition/Types";

export function RDsPerformance({ dsPerformance }: { dsPerformance: DsPerformance; }) {
  const { musicPieceId, constituents, videoLink } = dsPerformance;
  return (
    <_RPerformance musicPieceId={musicPieceId} constituents={constituents || undefined} videoLink={videoLink || undefined} />
  );
}
export function RPerformanceInit({ performanceInit }: { performanceInit: PerformanceInit; }) {
  const { piece, constituents, videoLink } = performanceInit;
  return (
    <_RPerformance musicPieceDisplayId={piece} constituents={constituents} videoLink={videoLink} />
  );
}

export function RStagedPerformance({performance}: {performance: StagedPerformance}) {
  const {musicPiece, videoLink, constituents} = performance;
  return(<RPerformanceParts musicPiece={musicPiece} videoLink={videoLink} constituents={constituents} />)
}

function _RPerformance({ musicPieceId: id, musicPieceDisplayId: displayId, constituents, videoLink }: {
  musicPieceId?: string;
  musicPieceDisplayId?: string;
  constituents?: DsPerformedConstituent[] | PerformedConstituentInit[];
  videoLink?: VideoLink | VideoLinkInit;
}) {
  const [musicPiece, setMusicPiece] = useState<DsMusicPiece | undefined>(undefined);

  useEffect(() => {
    const load = async () => {
      const mp = id ? await getDsMusicPiece(id) : displayId ? await fGetDsMusicPiece(displayId) : undefined;
      if (mp) {
        setMusicPiece(mp);
      }
    };
    load();
  }, []);

  if (!musicPiece) {
    return <div />;
  }

  return ( <RPerformanceParts musicPiece={musicPiece} constituents={constituents} videoLink={videoLink} /> )
}

type RPerformancePartsProps = {
  musicPiece: DsMusicPiece, 
  constituents?: DsPerformedConstituent[] | PerformedConstituentInit[] | EConstituent[],
  videoLink?: VideoLink | EVideoLink
}

export function RPerformanceParts({musicPiece, constituents, videoLink}: RPerformancePartsProps) {
  return (
    <div>
      {musicPiece
        ? <div style={{marginBottom: Styling.SMALL_V_SPACE}}><RMusicPieceLabel musicPiece={musicPiece} /></div>
        : <div />}
        {constituents && constituents.length > 0
          ? constituents.map(c => 
              <div style={{marginBottom: Styling.SMALL_V_SPACE}}>
                <RConstituent musicPiece={musicPiece} constituent={c} />
              </div>
            )
          : <RVideoLink videoLink={videoLink} />
        }
    </div>
  );
}


function RConstituent({musicPiece, constituent}: {musicPiece: DsMusicPiece, constituent: DsPerformedConstituent | PerformedConstituentInit}) {

  const lg = ENGLISH;
  let displayName;
  if (musicPiece.constituents && musicPiece.constituents.length > 0) {
    const c = musicPiece.constituents.find(c => c?.displayId === constituent.displayId);
    if (c) { displayName = c.displayName[lg]; }
  }

  const {displayId, videoLink} = constituent
  return(
    <div style={{marginBottom: 2}}>
      <RBoldText text={displayName || ""} />
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
    console.log("videoLink", videoLink)
    return(
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>Platform: {platform || "Youtube"}, </div>
        <div>VideoId: {videoId}, </div>
        <div>starts at: {startTimeInSeconds}</div>
      </div>
    )
  }
}


/*
function _getConstituentDisplayName(musicPiece: DsMusicPiece, constituent: DsPerformedConstituent) : string {
  const lg = ENGLISH;
  if (musicPiece.constituents && musicPiece.constituents.length > 0) {
    const c = musicPiece.constituents.find(c => c?.displayId === constituent.displayId);
    if (c) { return c.displayName[lg]; }
  }
  return "";
}
*/