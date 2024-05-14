
import { MusicPiece } from "../Competition/StageMusicPiece";
import { RChosenPieceForm } from "./RChosenPieceForm";
import { RIconButton } from "../Base/Base";
import { useEffect, useState } from "react";
import { EChosenPiece, newEChosenPiece } from "../Competition/RAuditionEditor";
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit";
import { RChosenPiece, RChosenPieces } from "../BasicRendering/RMusicPiece";
import { RSortableList } from "../Base/RSortableList";

type RChosenPiecesFormProps = {
  chosenPieces: EChosenPiece[], 
  repertoire: MusicPiece[],
  onSubmit: (session: EChosenPiece) => void
}

export function RChosenPiecesForm({chosenPieces, repertoire}: RChosenPiecesFormProps) {

  const [currentPieces, setCurrentPieces] = useState<EChosenPiece[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentPieces([...chosenPieces]);
  }, [chosenPieces])

  const onChangeChosenPiece = (piece: EChosenPiece, ix: number) => {
    const clone = [...currentPieces];
    clone.splice(ix, 1, piece);
    setCurrentPieces(clone);
  }

  const onRemoveChosenPiece = (ix: number) => {
    const clone = [...currentPieces];
    clone.splice(ix, 1);
    setCurrentPieces(clone);
  }

  return(
    <div>
      {
        currentPieces.map((chosenPiece: EChosenPiece, i: number) => 
          <div className="itc-row" style={{alignItems: 'flex-start', justifyContent: "space-between"}}>
            <RChosenPieceForm 
                repertoire={repertoire} 
                chosenPiece={chosenPiece}
                onChange={(newPiece: EChosenPiece) => onChangeChosenPiece(newPiece, i)} />
            <RIconButton icon="remove" label="" onClick={() => onRemoveChosenPiece(i)}/>
          </div>
        )
      }
      <RIconButton icon="add" label="" size="big" onClick={() => {setCurrentPieces([...currentPieces, newEChosenPiece()])}}/>

      <ConfirmAndSubmit<EChosenPiece[]> 
          data={currentPieces.filter(cp => (!! cp.musicPiece))} 
          onSubmit={() => {}}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          renderData={(chosenPieces: EChosenPiece[]) => 
            <RSortableList<EChosenPiece>
              items={chosenPieces}
              onChange={(chosenPieces: EChosenPiece[]) => { setCurrentPieces(chosenPieces)}}
              render={(cp: EChosenPiece) => <RChosenPiece chosenPiece={cp} />}
          />}
      />      
    </div>
  );
}
