import { DataStore } from "@aws-amplify/datastore";

import { DsMusicPiece } from "../../models";
import { RoundDisplayIdType } from "../Base/Helpers";
import { MusicPiece, stageMusicPiece } from "./StageMusicPiece";
import { LANGUAGE } from "../../util/common/language";

export async function getRoundRepertoire(concoursRoundId: RoundDisplayIdType): Promise<DsMusicPiece[]> {

  // ACHTUNG: REPERTOIRE-ZUGEHOERIGKEIT IST NOCH NICHT ERFASST !!!!! TODO !!!!!!
  const allMusicPieces = await DataStore.query(DsMusicPiece);
  const rep = getRepertoireDids(concoursRoundId);

  return rep.map((did: string) => 
    allMusicPieces.find((mp: DsMusicPiece) => mp.displayId === did)
  ).filter((mp: DsMusicPiece | undefined) => (!! mp) ) as DsMusicPiece[] ;

}

export async function getRoundRepertoireStaged(lg: LANGUAGE, concoursRoundId: RoundDisplayIdType): Promise<MusicPiece[]> {
  return (await getRoundRepertoire(concoursRoundId)).map(mp => stageMusicPiece(lg, mp));
}

function getRepertoireDids(concoursRoundId: RoundDisplayIdType): string[] {
  const rep = RepertoireDidLookup[concoursRoundId];
  const sortStrings = rep.map(
    s => {
      const ix0 = s.indexOf(":");
      if (! ix0) {
        console.log("SOMETHING WRONG : ", s);
        throw new Error();
      }
      const composer = s.substring(0,ix0);
      const piece = s.substring(ix0+1);

      let ix = composer.lastIndexOf(" ");
      if (composer.substring(ix+1) === "Bartholdy") { // special case
        ix = composer.indexOf(" ");
      }
      return composer.substring(ix+1) + composer.substring(0,ix) + piece;
    }
  )
  const range = Array.from(Array(sortStrings.length).keys());
  // @ts-ignore
  range.sort((i: number, j: number) => (sortStrings[i] && sortStrings[j] && sortStrings[i] < sortStrings[j]) ? -1 : 1);

  return range.map(j => rep[j]);
  
}


const RepertoireDidLookup = {
  "Concours 2024: Round One":
  [
    "Domenico Scarlatti: K 1 (L.366)",
    "Domenico Scarlatti: K 9 (L.413)",
    "Domenico Scarlatti: K 20 (L.375)",
    "Domenico Scarlatti: K 87 (L.33)",
    "Domenico Scarlatti: K 214 (L.165)",
    "Domenico Scarlatti: K 380 (L.23)",
    "Domenico Scarlatti: K 519 (L.475)",
    "Johann Sebastian Bach: BWV 870",
    "Johann Sebastian Bach: BWV 871",
    "Johann Sebastian Bach: BWV 872",
    "Johann Sebastian Bach: BWV 873",
    "Johann Sebastian Bach: BWV 874",
    "Johann Sebastian Bach: BWV 875",
    "Johann Sebastian Bach: BWV 876",
    "Johann Sebastian Bach: BWV 877",
    "Johann Sebastian Bach: BWV 878",
    "Johann Sebastian Bach: BWV 879",
    "Johann Sebastian Bach: BWV 880",
    "Johann Sebastian Bach: BWV 881",
    "Johann Sebastian Bach: BWV 882",
    "Johann Sebastian Bach: BWV 883",
    "Johann Sebastian Bach: BWV 884",
    "Johann Sebastian Bach: BWV 885",
    "Johann Sebastian Bach: BWV 886",
    "Johann Sebastian Bach: BWV 887",
    "Johann Sebastian Bach: BWV 888",
    "Johann Sebastian Bach: BWV 889",
    "Johann Sebastian Bach: BWV 890",
    "Johann Sebastian Bach: BWV 891",
    "Johann Sebastian Bach: BWV 892",
    "Johann Sebastian Bach: BWV 893",
    "Ludwig van Beethoven: Op. 2,1",
    "Ludwig van Beethoven: Op. 10,1",
    "Ludwig van Beethoven: Op. 13",
    "Ludwig van Beethoven: Op. 26",
    "Ludwig van Beethoven: Op. 27,1",
    "Ludwig van Beethoven: Op. 27,2",
    "Ludwig van Beethoven: Op. 54",
    "Ludwig van Beethoven: Op. 78",
    "Ludwig van Beethoven: Op. 81a",
    "Ludwig van Beethoven: Op. 101",
    "Ludwig van Beethoven: Op. 109",
    "Fr\u00e9d\u00e9ric Chopin: \u00c9tudes Op. 10",
    "Fr\u00e9d\u00e9ric Chopin: \u00c9tudes Op. 25",
    "Franz Liszt: S 141",
    "Franz Liszt: S. 139"
  ],
  "Concours 2024: Round Two":
  [
    "Ludwig van Beethoven: Op. 2,3",
    "Ludwig van Beethoven: Op. 22",
    "Ludwig van Beethoven: Op. 31,2",
    "Ludwig van Beethoven: Op. 53",
    "Ludwig van Beethoven: Op. 57",
    "Ludwig van Beethoven: Op. 110",
    "Ludwig van Beethoven: Op. 111",
    "Wolfgang Amadeus Mozart: K. 310",
    "Wolfgang Amadeus Mozart: K. 533 (K. 494)",
    "Joseph Haydn: Hob. XVI:50",
    "Joseph Haydn: Hob. XVI:52",
    "Franz Schubert: Op. 15 / D. 760",
    "Franz Schubert: D. 664",
    "Franz Schubert: Op. 78 / D. 894",
    "Franz Schubert: Op. posth. / D. 958",
    "Franz Schubert: Op. 94 / D. 780",
    "Franz Schubert: Op. posth. / D. 946",
    "Robert Schumann: Op. 11",
    "Robert Schumann: Op. 14",
    "Robert Schumann: Op. 13",
    "Johannes Brahms: Op. 5",
    "Johannes Brahms: Op. 35",
    "Johannes Brahms: Op. 10",
    "Fr\u00e9d\u00e9ric Chopin: Op. 58",
    "Fr\u00e9d\u00e9ric Chopin: Op. 28",
    "Fr\u00e9d\u00e9ric Chopin: Ballades (complete)",
    "Franz Liszt: S. 178",
    "Maurice Ravel: M. 55",
    "B\u00e9la Bart\u00f3k: (Sz 80 / BB 88)",
    "Wolfgang Amadeus Mozart: K. 576",
    "Wolfgang Amadeus Mozart: K. 397",
    "Wolfgang Amadeus Mozart: K. 475",
    "Wolfgang Amadeus Mozart: K. 511",
    "Wolfgang Amadeus Mozart: K. 540",
    "Joseph Haydn: Hob. XVI:23",
    "Felix Mendelssohn Bartholdy: Op. 19b",
    "Felix Mendelssohn Bartholdy: Op. 30",
    "Robert Schumann: Op. 1",
    "Robert Schumann: WoO 24",
    "Johannes Brahms: Op. 10 No. 1",
    "Johannes Brahms: Op. 10 No. 2",
    "Johannes Brahms: Op. 10 No. 3",
    "Johannes Brahms: Op. 10 No. 4",
    "Johannes Brahms: Op. 79 No. 1",
    "Johannes Brahms: Op. 79 No. 2",
    "Fr\u00e9d\u00e9ric Chopin: Ballade No. 1 Op. 23",
    "Fr\u00e9d\u00e9ric Chopin: Ballade No. 2 Op. 38",
    "Fr\u00e9d\u00e9ric Chopin: Op. 29",
    "Fr\u00e9d\u00e9ric Chopin: Op. 36",
    "Fr\u00e9d\u00e9ric Chopin: Op. 51",
    "Fr\u00e9d\u00e9ric Chopin: Op. 66",
    "Franz Liszt: S. 244 No. 12",
    "Franz Liszt: S. 514",
    "Franz Liszt: S. 173",
    "Franz Liszt: S. 145 No. 1",
    "Franz Liszt: S. 145 No. 2",
    "Claude Debussy: L. 100",
    "Claude Debussy: L. 110",
    "Maurice Ravel: M. 19",
    "Maurice Ravel: M. 61",
    "B\u00e9la Bart\u00f3k: Op. 8c (Sz 47 / BB 55)",
    "B\u00e9la Bart\u00f3k: Op. 14 (Sz 62 / BB 70)"
  ],
  "Concours 2024: Round Three":
  [
    "Wolfgang Amadeus Mozart: K. 246",
    "Wolfgang Amadeus Mozart: K. 271",
    "Wolfgang Amadeus Mozart: K. 453",
    "Wolfgang Amadeus Mozart: K. 466",
    "Wolfgang Amadeus Mozart: K. 488",
    "Wolfgang Amadeus Mozart: K. 491",
    "Wolfgang Amadeus Mozart: K. 503",
    "Wolfgang Amadeus Mozart: K. 595"
  ],
  "Concours 2024: Round Four": 
    [
      "Ludwig van Beethoven: Op. 37",
      "Ludwig van Beethoven: Op. 58",
      "Camille Saint-Sa\u00ebns: Op. 22",
      "Edvard Grieg: Op. 16",
      "B\u00e9la Bart\u00f3k: (Sz 83 / BB 91)",
      "B\u00e9la Bart\u00f3k: (Sz 95 / BB 101)",
      "B\u00e9la Bart\u00f3k: (Sz 119 / BB 127)",
      "Toshio Hosokawa: Etude I-VI / No 1"
    ]
  }
