import { Button, Checkbox, Divider, Select } from "antd";
import { useEffect, useState } from "react";
import { RDisplayablePicker } from "../Base/RDisplayablePicker";
import { EChosenPiece } from "../Competition/RAuditionEditor";
import { RMusicPieceLabel } from "../BasicRendering/RMusicPiece";
import { DsMusicPiece } from "../../models";
import { filterNull } from "../Base/Base";

type RChosenPieceFormProps = {
  chosenPiece: EChosenPiece, 
  repertoire: DsMusicPiece[],
  onChange: (p: EChosenPiece) => void
}

export function RChosenPieceForm({chosenPiece, repertoire, onChange}: RChosenPieceFormProps) {

  const [selected, setSelected] = useState<DsMusicPiece|undefined>(chosenPiece.musicPiece);
  const [chosenConstituents, setChosenConstituents] = useState<string[]>(chosenPiece.chosenConstituentsDids);

  useEffect(() => {
    if (chosenPiece) {
      setSelected(chosenPiece.musicPiece);
      setChosenConstituents(chosenPiece.chosenConstituentsDids);
    }

    }, [chosenPiece]
  );

  const notify = (newSelectedMusicPiece: DsMusicPiece|undefined, newChosenConstituents: string[]) => {
    if (newSelectedMusicPiece) {
      onChange({
        ...chosenPiece,
        musicPiece: newSelectedMusicPiece,
        chosenConstituentsDids: newChosenConstituents  
      })
    }
  };
  
  return(
    <div style={{marginBottom: 20}}>
      <RDisplayablePicker<DsMusicPiece>
          title={"Select Music Piece"}
          placeholder="Select Music Piece"
          selectedItem={selected}
          setSelectedItem={(mp: DsMusicPiece) => {
            setSelected(mp);
            setChosenConstituents([]);
            notify(mp, chosenConstituents);
          }}
          items={repertoire}
          render={(mp: DsMusicPiece) => <RMusicPieceLabel musicPiece={mp} />}
      />

      {selected && selected.constituents
        ? <Checkbox.Group
            value={chosenConstituents}
            options={filterNull(selected.constituents).map(c => {
                return ({label: c.displayId, value: c.displayId})
            })}
            onChange={(dids: string[]) => { setChosenConstituents(dids); notify(selected, dids); }}
            style={{ display: 'flex', flexDirection: 'column' }}
          />
        : <div />
      }
    </div>
  );
}
