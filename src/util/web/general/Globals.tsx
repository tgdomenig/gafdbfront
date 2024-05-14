
export type POST_CATEGORY = "Geza Anda" | "Foundation" | "News" | "Archived News" | "Concours" | "Main Event" | "ArtistsManagement"
   | "Concours 2024" | "Concours 2024 Round 0" | "Concours 2024 Round 1" | "Concours 2024 Round 2" | "Concours 2024 Round 3" | "Concours 2024 Round 4"
;


export const ManagedArtistsLookup = new Map<string, string>([
  ['mihaly_berecz', "Berecz, Mih\u00e1ly"],
  ['anton_gerzenberg', "Gerzenberg, Anton"],
  ['giorgi_gigashvili', "Gigashvili, Giorgi"],
  ['claire_huangci', "Huangci, Claire"],
  ['dasol_kim', "Kim, Dasol"],
  ['marek_kozak', "Koz\u00e1k, Marek"],
  ['jonghai_park', "Park, Jong-Hai"],
  ['ronaldo_rolim', "Rolim, Ronaldo"],
  ['rolando_rolim', "Rolim, Ronaldo"],
  ['alexandr_shaikin', "Shaikin, Aleksandr"],
  ['sergey_tanin', "Tanin, Sergey"],
  ['julian_trevelyan', "Trevelyan, Julian"],
  ['alexei_volodin', "Volodin, Alexei"],
  ['vasilii_zabolotnii', "C24 CAND: Vasilii Zabolotnii"]
]);

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
