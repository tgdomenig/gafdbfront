import { useEffect, useState } from "react";
import { RoundDisplayIdType, competitor2CandidateDid } from "../Base/Helpers";
import { RSelectCompetitors } from "./RSelectCompetitors";
import { DsConcoursRound, DsParticipation } from "../../models";
import { getDsParticipation, getDsParticipations } from "../../data/Datastore/ModelsCommon/Participation/ParticipationR";
import { fGetDsConcoursRound } from "../../data/Datastore/ModelsCommon/Round/RoundR";
import { SelectRound } from "./Base";
import { RListOfStrings } from "../BasicRendering/RStrings";
import { RIconButton } from "../Base/Buttons";
import { MyBox } from "../Base/MyBox";
import { PageTitle, SubTitle } from "../Base/Base";
import { getDSChosenPieces } from "../../data/Datastore/ModelsCommon/MusicPiece/MusicPieceR";
import { getDsPerformances } from "../../data/Datastore/ModelsCommon/Performance/PerformanceR";
import { getDsMission } from "../../data/Datastore/ModelsCommon/Mission/MissionR";
import { saveDsParticipation } from "../../data/Datastore/ModelsWeb/Participation/ParticipationCUD";
import { getDsSessions } from "../../data/Datastore/ModelsCommon/Session/SessionR";
import { xDelete } from "../../data/Datastore/ModelsWeb/Base/xDelete";
import { SIMULATION_MODE, IS_LIVE } from "../Base/StylingConstants";
import { Card } from "antd";

export function RCompetitorsScreen() {

  const [currentRoundDid, setCurrentRoundDid] = useState<RoundDisplayIdType|"">("");
  const [currentRound, setCurrentRound] = useState<DsConcoursRound|undefined>(undefined);
  const [competitors, setCompetitors] = useState<DsParticipation[]>([]);
  const [isEditMode, setEditMode] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
      const load = async () => {
        if (currentRoundDid) {
          const round = await fGetDsConcoursRound(currentRoundDid);
          if (round) {
            setCurrentRound(round);
            setCompetitors(await getDsParticipations({concoursRoundId: round.id}));
          }
        }
      }
      load();
    },
  [currentRoundDid, triggerReload]);

  const onSubmit = async (selectedMissionIds: string[]) => {

    try {
      for (var competitor of competitors) {

        /* --- Deletions --- */
        if (! selectedMissionIds.find(id => competitor.missionId === id)) {
          // check if there are dependencies that prevent participation from being deleted

          const musicPieces = await getDSChosenPieces(competitor.id);
          if (musicPieces && musicPieces.length > 0) {
            throw new Error(`Cannot delete ${competitor.displayId} because there are associated music pieces in the data base`)  
          }
          const performances = await getDsPerformances({competitorId: competitor.id})
          if (performances && performances.length > 0) {
            throw new Error(`Cannot delete ${competitor.displayId} because there are associated performances in the data base`)  
          }
          if (currentRound) {
            const candidateDid = competitor2CandidateDid(competitor.displayId);
            const sessions = await getDsSessions(currentRound.id);
            
            for (var session of sessions) {
              if (session.competitors && session.competitors.find(cDid => candidateDid === cDid)) {
                throw new Error(`Cannot delete ${competitor.displayId} because there are associated sessions in the data base`)
              }
            }
          }

          if (SIMULATION_MODE) {
            console.log("SIMULATION: Delete Participation: ", competitor.id)
          }
          else {
            await xDelete(getDsParticipation, competitor.id);
          }

        }
      }

      /* --- Additions --- */
      for (var missionId of selectedMissionIds) {
        if (! competitors.find(c => c.missionId === missionId)) {
          const dsMission = await getDsMission(missionId);
          if (dsMission && currentRound) {
            if (SIMULATION_MODE) {
              console.log("SIMULATION: Saving Participation: ", JSON.stringify({
                dsMission,
                currentRound
              }));
            }
            else {
              await saveDsParticipation(dsMission, currentRound);
            }
          }
          else {
            throw new Error("Something went wrong, could not add some of the competitors")
          }
        }
      }
    }
    catch (e) {
      // @ts-ignore
      alert(e.message);
    }
    setEditMode(false);
    setTriggerReload(! triggerReload);
  }

  return(
      <div>
        <PageTitle title="Competitors" />

      <SelectRound onChange={(round) => { setCurrentRoundDid(round); setEditMode(false); }} />

      <Card title="Note" bordered={false} size="small" style={{marginBottom: 20}}>
          Select the competitors playing in the next round.
      </Card>


      {currentRound
        ? isEditMode
          ?
              <MyBox type="edit">
                <RSelectCompetitors 
                  round={currentRound} 
                  competitors={competitors} 
                  onSubmit={onSubmit}
                  onCancel={() => { setEditMode(false); }}
                />
              </MyBox>
          : <div>
              <MyBox toTheRight={<RIconButton icon="edit" onClick={() => { setEditMode(true); }} />}>
                <SubTitle title="Candidates competing in this round" /> 
                <RenderCompetitors competitors={competitors} />
              </MyBox>
            </div>
        : <div />
      }
    </div>
  )
}

function RenderCompetitors({competitors}: {competitors: DsParticipation[]}) {
  const dids = competitors.map(c => c.displayId);
  return(
    <RListOfStrings strings={dids} slug={"competitor"} />
  )
}