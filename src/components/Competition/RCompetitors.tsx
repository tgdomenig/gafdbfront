import { useEffect, useState } from "react";
import { RoundDisplayIdType } from "../Base/Helpers";
import { RSelectCompetitors } from "./RSelectCompetitors";
import { DsConcoursRound, DsParticipation } from "../../models";
import { getDsParticipations } from "../../data/Datastore/ModelsCommon/Participation/ParticipationR";
import { fGetDsConcoursRound } from "../../data/Datastore/ModelsCommon/Round/RoundR";
import { SelectRound } from "./Base";
import { RListOfStrings } from "../BasicRendering/RStrings";
import { RButton, RIconButton } from "../Base/Buttons";
import { MyBox } from "../Base/MyBox";


export function RCompetitors() {

  const [currentRoundDid, setCurrentRoundDid] = useState<RoundDisplayIdType|"">("");
  const [currentRound, setCurrentRound] = useState<DsConcoursRound|undefined>(undefined);
  const [competitors, setCompetitors] = useState<DsParticipation[]>([]);
  const [isEditMode, setEditMode] = useState(false);

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
  [currentRoundDid]);

  const onSubmit = (selectedMissionIds: string[]) => {
    console.log(selectedMissionIds);
    // hier abgewählte löschen, neue hinzufügen (DsParticipations) !!!!!
    setEditMode(false);
  }

  return(
    <div>
      <SelectRound onChange={(round) => { setCurrentRoundDid(round); setEditMode(false); }} />

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