import { Button, Checkbox, Divider, Modal } from "antd";
import { useState } from "react";
import './styles.css'
import { SubTitle } from "../Base/Base";
import { getCandidateName } from "../Base/Helpers";
import { RenderESession } from "../BasicRendering/RSession";
import TimeFnsPicker from "../Base/TimeFnsPicker";
import DateFnsPicker from "../Base/DateFnsPicker";
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit";
import { RSortableList } from "../Base/RSortableList";
import { MyBox } from "../Base/MyBox";

type RSelectProps = {
  roundDid: string,
  session: ESession,
  eligibleCompetitors: string[], // items can be e.g. ids or displayIds
  onSubmit: (session: ESession) => void
  onCancel: () => void
}

export type ESession = { // "E" for "edit"
  id: string,
  displayId: string,
  sessionName: string,
  date: Date,
  start: Date
  end: Date,
  competitors: string[] // displayIds
}

export function RSessionForm({roundDid, session, eligibleCompetitors, onSubmit, onCancel}: RSelectProps) {

  const [currentSession, setCurrentSession] = useState<ESession>({...session});
  //   sessionName: "",
  //   date: new Date(),
  //   start: todayAt(10),
  //   end: todayAt(11),
  //   competitors: []
  // });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = eligibleCompetitors.map((candidate) => ({label: getCandidateName(candidate), value: candidate}));

  return(
    <MyBox type="edit">

      <SubTitle title={`Define Session for ${roundDid}`} />

      <div style={{marginBottom: 20}}>
        <DateFnsPicker format="dd.MM.yyyy" defaultValue={currentSession.date} placeholder="Datum"
          onChange={(d: Date) => setCurrentSession({...currentSession, date: d})}        
        />

        <TimeFnsPicker format="HH:mm" minuteStep={5} defaultValue={currentSession.start} placeholder="Von"
          onChange={(t: Date) => {
            console.log("t", t);
            setCurrentSession({...currentSession, start: t})}}        
        />
    
        <TimeFnsPicker format="HH:mm" minuteStep={5} defaultValue={currentSession.end} placeholder="Bis"
          onChange={(t: Date) => setCurrentSession({...currentSession, end: t})}        
        />
      </div>
      <Checkbox.Group
        value={currentSession.competitors}
        options={options}
        style={{ display: 'flex', flexDirection: 'column' }}
        onChange={ (candidates: string[]) => setCurrentSession({...currentSession, competitors: candidates})}
      />

      <Divider />

      <RSortableList<string> 
          items={currentSession.competitors} 
          onChange={(sorted: string[]) => { setCurrentSession({...currentSession, competitors: sorted}) }}
          render={(did: string) => <div>{did}</div>} />

      <ConfirmAndSubmit<ESession> 
          data={currentSession} 
          onSubmit={onSubmit}
          onCancel={onCancel}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          renderData={(sn: ESession) => <RenderESession session={sn} />}
      />

    </MyBox>
  );
}

