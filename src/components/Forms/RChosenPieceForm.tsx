import { Button, Checkbox, Divider, Select } from "antd";
import { useEffect, useState } from "react";
import { MusicPiece } from "../Competition/StageMusicPiece";
import { RDisplayablePicker } from "../Base/RDisplayablePicker";
import { EChosenPiece } from "../Competition/RAuditionEditor";
import { RMusicPieceLabel } from "../BasicRendering/RMusicPiece";

type RChosenPieceFormProps = {
  chosenPiece: EChosenPiece, 
  repertoire: MusicPiece[],
  onChange: (p: EChosenPiece) => void
}

export function RChosenPieceForm({chosenPiece, repertoire, onChange}: RChosenPieceFormProps) {

  const [selected, setSelected] = useState<MusicPiece|undefined>(chosenPiece.musicPiece);
  const [chosenConstituents, setChosenConstituents] = useState<string[]>(chosenPiece.chosenConstituentsDids);

  useEffect(() => {
    if (chosenPiece) {
      setSelected(chosenPiece.musicPiece);
      setChosenConstituents(chosenPiece.chosenConstituentsDids);
    }

    }, [chosenPiece]
  );

  const notify = (newSelectedMusicPiece: MusicPiece|undefined, newChosenConstituents: string[]) => {
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
      <RDisplayablePicker<MusicPiece>
          title={"Select Music Piece"}
          placeholder="Select Music Piece"
          selectedItem={selected}
          setSelectedItem={(mp: MusicPiece) => {
            setSelected(mp);
            setChosenConstituents([]);
            notify(mp, chosenConstituents);
          }}
          items={repertoire}
          render={(mp: MusicPiece) => <RMusicPieceLabel musicPiece={mp} />}
      />

      {selected
        ? <Checkbox.Group
            value={chosenConstituents}
            options={selected.constituents.map(c => {
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


