import { stageTextField } from "../../data/Datastore/ModelsCommon/Base/Staging";
import { DsMPConstituent, DsMusicPiece } from "../../models";
import { LANGUAGE } from "../../util/common/language";


/**
 * This method is borrowed from gafapp3
 */
export function stageMusicPiece(lg: LANGUAGE, musicPiece: DsMusicPiece) : MusicPiece {
  const {id, displayId, composer, displayName: mpDisplayName, constituents} = musicPiece;

  return(
    {
      id,
      displayId,
      composer,
      displayName: stageTextField(lg, mpDisplayName),
      constituents: constituents ? stageConstituents(lg, constituents) : []
    } as MusicPiece
  );
}

export function stageConstituents(lg: LANGUAGE, constituents: (DsMPConstituent|null)[]) : MPConstituent[] {
  const nonNull = constituents.filter(el => !! el) as DsMPConstituent[];
  return nonNull.map(({displayId, displayName}) => ({
    displayId,
    displayName: stageTextField(lg, displayName) || displayId
  }))
}

export type MusicPiece = {
  id: string,
  displayId: string,
  composer: string,
  displayName: string
  constituents: MPConstituent[]
}

export type MPConstituent = {
  displayId: string,
  displayName: string
}
