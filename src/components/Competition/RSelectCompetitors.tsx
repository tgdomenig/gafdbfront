import { Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import { RoundDisplayIdType, RoundDisplayIds, getEligibleCompetitors } from "../Base/Helpers";
import { DsParticipation } from "../../models";
import { SelectRound } from "./Base";
import { SubTitle } from "../Base/Base";
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit";
import { RParagraph } from "../Base/RParagraph";


/**
 * Auswahl der aktuellen Runde
 * Lädt die Competitors der letzten Runde und ruft das Formular auf zur Auswahl der Competitors für diese Runde
 * 
 */
export function RSelectCompetitors() {

  const [currentRound, setCurrentRound] = useState<RoundDisplayIdType|"">("");
  const [competitors, setCompetitors] = useState<DsParticipation[]>([]);

  const [selection, setSelection] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
      const load = async () => {
        if (currentRound) {
          setCompetitors(await getEligibleCompetitors(currentRound));
        }
      }
      load();
    },
  [currentRound]);

  return(
    <div>
      <SelectRound onChange={(round) => { setCurrentRound(round); }} />

      {currentRound && competitors.length > 0
        ? <div >

            <SubTitle title={`Select Candidates`} />

            <Checkbox.Group
              options={competitors.map(c => c.displayId)} 
              style={{ display: 'flex', flexDirection: 'column' }}
              onChange={ (items: string[]) => setSelection(items)}
            />
      
            <ConfirmAndSubmit<string[]> 
                data={selection} 
                onSubmit={(competitorDids: string[]) => {console.log("SUBMIT", competitorDids)}}
                disabled={selection.length === 0}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                renderData={(strings: string[]) => <RParagraph content={strings}/>}
            />
          </div>
        : <div />
      }
      
    </div>
  );
}

