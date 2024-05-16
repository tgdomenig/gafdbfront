
import { DsMusicPiece, DsPerformedConstituent, TextField } from "../../models";
import { ENGLISH } from "../../util/common/language";
import { EChosenPiece } from "../Competition/RAuditionEditor";
import { MusicPiece } from "../Competition/StageMusicPiece";
import { RListOfStrings } from "./RStrings";


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

export function RDsMusicPiece({ musicPiece }: { musicPiece: DsMusicPiece }) {
  const lg = ENGLISH;
  const {composer, displayName, constituents} = musicPiece;

  if (! composer) {
    return <div />;
  }
  else {
    const constituentsDNames = constituents
    ? constituents.map(c => c ? c.displayName[lg] : "").filter(c => !! c)
    : undefined;

    return (
      <div>
        <RMusicPieceLabel musicPiece={musicPiece} />
        <RListOfStrings strings={constituentsDNames} slug="constituent" />
      </div>
    );
  }
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

export function RMusicPieceLabel({ musicPiece }: { musicPiece?: DsMusicPiece; }): JSX.Element {

  if (musicPiece) {
    const {composer, displayName} = musicPiece;
    if (composer) {
      return(
        <div><span><strong>{composer}: </strong>{displayName[ENGLISH]}</span></div>
      );
    }
  }
  return(<div />)
}
