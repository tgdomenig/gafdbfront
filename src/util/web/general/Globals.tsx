
export type POST_CATEGORY = "Geza Anda" | "Foundation" | "News" | "Archived News" | "Concours" | "Main Event" | "ArtistsManagement"
   | "Concours 2024" | "Concours 2024 Round 0" | "Concours 2024 Round 1" | "Concours 2024 Round 2" | "Concours 2024 Round 3" | "Concours 2024 Round 4" ;



export function getConcoursDisplayId(yearOfConcours: string) {
  return `Concours ${yearOfConcours}`;
}