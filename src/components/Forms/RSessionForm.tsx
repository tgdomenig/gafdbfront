import { Button, Checkbox, Divider, Modal } from "antd";
import ShowJson from "../Base/JsonPP";
import { useState } from "react";
import './styles.css'
import { RButton, SubTitle } from "../Base/Base";
import { getCandidateName, todayAt } from "../Base/Helpers";
import { RenderESession } from "../BasicRendering/RSession";
import TimeFnsPicker from "../Base/TimeFnsPicker";
import DateFnsPicker from "../Base/DateFnsPicker";
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit";
import { RSortableList } from "../Base/RSortableList";

type RSelectProps = {
  roundDid: string,
  eligibleCandidates: string[], // items can be e.g. ids or displayIds
  onSubmit: (session: ESession) => void
}

export type ESession = { // "E" for "edit"
  sessionName: string,
  date: Date,
  start: Date
  end: Date,
  competitors: string[] // displayIds
}

export function RSessionForm({roundDid, eligibleCandidates: items, onSubmit}: RSelectProps) {

  const [session, setSession] = useState<ESession>({
    sessionName: "",
    date: new Date(),
    start: todayAt(10),
    end: todayAt(11),
    competitors: []
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = items.map((candidate) => ({label: getCandidateName(candidate), value: candidate}));

  return(
    <div style={{padding: 20, backgroundColor: '#DEDEDE'}}>

      <SubTitle title={`Define Session for ${roundDid}`} />

      <div style={{marginBottom: 20}}>
        <DateFnsPicker format="dd.MM.yyyy" defaultValue={session.date} placeholder="Datum"
          onChange={(d: Date) => setSession({...session, date: d})}        
        />

        <TimeFnsPicker format="HH:mm" minuteStep={5} defaultValue={session.start} placeholder="Von"
          onChange={(t: Date) => setSession({...session, start: t})}        
        />
    
        <TimeFnsPicker format="HH:mm" minuteStep={5} defaultValue={session.end} placeholder="Bis"
          onChange={(t: Date) => setSession({...session, end: t})}        
        />
      </div>
      <Checkbox.Group
        options={options}
        style={{ display: 'flex', flexDirection: 'column' }}
        onChange={ (candidates: string[]) => setSession({...session, competitors: candidates})}
      />

      <Divider />

      <RSortableList<string> 
          items={session.competitors} 
          onChange={(sorted: string[]) => { setSession({...session, competitors: sorted}) }}
          render={(did: string) => <div>{did}</div>} />

      <ConfirmAndSubmit<ESession> 
          data={session} 
          onSubmit={onSubmit}
          disabled={session.competitors.length === 0}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          renderData={(session: ESession) => <RenderESession session={session} />}
      />

    </div>
  );
}

