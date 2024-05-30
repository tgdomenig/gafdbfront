import { Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import { DsConcoursRound, DsParticipation } from "../../models";
import { SubTitle } from "../Base/Base";
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit";
import { RParagraph } from "../Base/RParagraph";
import { RoundDisplayIdType, getEligibleCompetitors } from "../Base/Helpers";


/**
 * Auswahl der aktuellen Runde
 * Lädt die Competitors der letzten Runde und ruft das Formular auf zur Auswahl der Competitors für diese Runde
 * 
 */
type RSelectCompetitors = {
  round: DsConcoursRound,
  competitors: DsParticipation[],
  onSubmit: (competitorDids: string[]) => void,
  onCancel: () => void
}
export function RSelectCompetitors({round, competitors, onSubmit, onCancel}: RSelectCompetitors) {

  const [eligibleCompetitors, setEligibleCompetitors] = useState<DsParticipation[]>([]);

  const [selection, setSelection] = useState<string[]>(competitors.map(c => c.missionId));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setEligibleCompetitors(await getEligibleCompetitors(round.displayId as RoundDisplayIdType));
    }
    load();
    },
  [round]);

  const getDisplayName = (missionId: string) => {
    const competitor = eligibleCompetitors.find(c => c.missionId === missionId);
    return (competitor) ? competitor.displayId : "unknown competitor !";
  }
    
  /*
    Bemerkung: Participations beziehen sich auf die Runden. 
    Die "eligible competitors" sind Participations der Vorrunde und haben z.B. nicht dieselben displayIds wie Participations in dieser Runde.
    Die Missions hingegen beziehen sich auf die Kandidaten und sind stabil über die Runden hinweg
  */ 
  const options = eligibleCompetitors.map(c => {
    const {displayId, missionId} = c;
    return {
      label: displayId,
      value: missionId
    }
  });

  return(
    <div>
      {eligibleCompetitors.length > 0
        ? <div >

            <SubTitle title={`Edit Candidates`} />

            <Checkbox.Group
              value={selection}
              options={options}
              style={{ display: 'flex', flexDirection: 'column' }}
              onChange={ (items: string[]) => setSelection(items)}
            />
      
            <ConfirmAndSubmit<string[]> 
                data={selection} 
                onSubmit={onSubmit}
                onCancel={onCancel}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                renderData={(missionIds: string[]) => 
                    <RParagraph content={missionIds.map(getDisplayName)}/>
                }
            />
          </div>
        : <div />
      }
      
    </div>
  );
}

