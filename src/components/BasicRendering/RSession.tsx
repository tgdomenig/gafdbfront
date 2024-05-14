import { ESession } from "../Forms/RSessionForm";
import { getCandidateName, toDateStr, toTimeStr } from "../Base/Helpers";
import { SubSubTitle } from "../Base/Base";


export function RenderESession({session}: {session: ESession}) {

  const {sessionName, date, start, end, competitors} = session;

  return(
    <div >
      <SubSubTitle title={`Datum: ${toDateStr(date)} von ${toTimeStr(start)} bis ${toTimeStr(end)}`} />
      {competitors
        ? competitors.map((c: string, i: number) => <div key={"comp-" + i}>{getCandidateName(c)}</div>)
        : <div />
      }
    </div>
  )

}

