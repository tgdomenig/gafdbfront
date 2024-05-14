import { EChosenPiece } from "../Competition/RAuditionEditor";
import { MusicPiece } from "../Competition/StageMusicPiece";


export function RChosenPieces({ chosenPieces }: { chosenPieces: EChosenPiece[]; }) {
  return (
    <div>
      {chosenPieces.map((cp: EChosenPiece, i: number) => {
        return (
          <div key={"chosenPiece-" + i} style={{marginBottom: 8}}>
            <RMusicPieceLabel musicPiece={cp.musicPiece} />
            {cp.chosenConstituentsDids.map((did: string, i: number) => {
              return(
                <div key={"chosen-piece-" + i}>
                  {did}
                </div>
              )
            })}
          </div>
        );
      })}
    </div>
  );
}

export function RChosenPiece({ chosenPiece }: { chosenPiece: EChosenPiece; }) {
  const {musicPiece, chosenConstituentsDids} = chosenPiece;
  return (
    <div>
      <RMusicPieceLabel musicPiece={musicPiece} />
      {chosenConstituentsDids.map((did: string, i: number) => {
        return(
          <div key={"chosen-piece-" + i}>
            {did}
          </div>
        )
      })}
    </div>
  );
}

export function RMusicPieceLabel({ musicPiece }: { musicPiece?: MusicPiece; }): JSX.Element {
  if (! musicPiece) {
    return <div />
  }
  else {
    const { composer, displayName } = musicPiece;

    return (
      <div><span><strong>{composer}: </strong>{displayName}</span></div>
    );  
  }
}

