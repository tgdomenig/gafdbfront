import { Styling } from "../Base/StylingConstants";

export function RListOfStrings({strings, slug}: {strings?: string[] | null, slug: string}) {
  return(
    strings 
    ? <div>
        {strings.map((s: string, i: number) => 
          <div style={{marginBottom: Styling.SMALL_V_SPACE}} key={"slug-"+i}>{s}</div>)}
      </div>
    : <div />
  )
}