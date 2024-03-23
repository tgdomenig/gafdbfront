import { useEffect, useState } from "react";
import { SubSubTitle, SubTitle } from "../Base/Base";
import { fmtDate, fmtTime } from "../../util/common/dateTime/Localized";
import { ENGLISH } from "../../util/common/language";
import { Voting } from "../../data/Datastore/ModelsCommon/Voting/Types";
import DateFnsPicker from "../Base/DateFnsPicker";
import { Button, InputNumber, Modal } from "antd";
import TimeFnsPicker from "../Base/TimeFnsPicker";
import { addMinutes } from "date-fns";

export function VotingTimeWindowEditor({voting}: {voting: Voting}) {

  const [startDateTime, setStartDateTime] = useState<Date|undefined>(voting.starts);
  const [durationInMinutes, setDurationInMinutes] = useState<number|undefined>(getDurationInMinutes(voting.starts, voting.terminates));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveVotingTimeWindow = () => {
    console.log("startDateTime", startDateTime);
    console.log("durationInMinutes", durationInMinutes);

    if (startDateTime && durationInMinutes) {
      const endDateTime = addMinutes(startDateTime, durationInMinutes);
      console.log(endDateTime);
    }

    setIsModalOpen(false);
  }

  return(
    <div>

      {voting
        ? <RVotingTimeWindow voting={voting} />
        : <div />
      }

      <Button onClick={() => setIsModalOpen(true) }>Edit</Button>

      <Modal
          width={"90%"}
          title="Edit Voting Time Window"
          open={isModalOpen} 
          onOk={() => { saveVotingTimeWindow(); }} 
          onCancel={ () => setIsModalOpen(false) }>

            <SubSubTitle title="Start Date and Time" />
            <div className="itc-row">
              <DateFnsPicker
                defaultValue={startDateTime} 
                onChange={(newDate) => setStartDateTime(newDate)}
              />

              <TimeFnsPicker 
                defaultValue={startDateTime}
                onChange={(newDate) => setStartDateTime(newDate)}
              />

            </div>

            <SubSubTitle title="Duration (in minutes)" />
            <InputNumber min={10} max={120} step={5} defaultValue={durationInMinutes} 
              onChange={ (nb) => { if (nb) { setDurationInMinutes(nb);}} }
            />
      </Modal>

    </div>
  );
}

function RVotingTimeWindow({voting}: {voting: Voting}) {


  const {starts, terminates} = voting;
  const durationInMinutes = (starts && terminates) ? (terminates.getTime() - starts.getTime()) / 60000 : undefined;

  if (starts) {
    return(
      <div>
        {starts ? fmtDate(starts, ENGLISH, "long") : <div />}
        {durationInMinutes ? <div>Duration: {durationInMinutes} Minutes</div> : <div />}
      </div>
    );
  }
  else {
    return <div />;
  }
}

function getDurationInMinutes(start?: Date, end?: Date) : number | undefined {
  return(
    (start && end) ? (end.getTime() - start.getTime()) / 60000 : undefined
  );
}