
import { RChosenPieceForm } from "./RChosenPieceForm";
import { RIconButton } from "../Base/Buttons";
import { useEffect, useState } from "react";
import { EChosenPiece, newEChosenPiece } from "../Competition/RAuditionEditor";
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit";
import { RChosenPiece } from "../BasicRendering/RMusicPiece";
import { RSortableList } from "../Base/RSortableList";
import { DsMusicPiece } from "../../models";

type RChosenPiecesFormProps = {
  chosenPieces: EChosenPiece[], 
  repertoire: DsMusicPiece[],
  onSubmit: (chosenPieces: EChosenPiece[]) => void
  onCancel: () => void
}

export function RChosenPiecesForm({chosenPieces, repertoire, onSubmit, onCancel}: RChosenPiecesFormProps) {

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
          onSubmit={() => { onSubmit(currentPieces); }}
          onCancel={onCancel}
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
