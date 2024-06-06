import { useEffect, useState } from "react";
import { SubSubTitle, SubTitle } from "../Base/Base";
import { fmtDate, fmtDateAndTime } from "../../util/common/dateTime/Localized";
import { ENGLISH } from "../../util/common/language";
import { Voting } from "../../data/Datastore/ModelsCommon/Voting/Types";
import DateFnsPicker from "../Base/DateFnsPicker";
import { Button, Descriptions, InputNumber, Modal } from "antd";
import TimeFnsPicker from "../Base/TimeFnsPicker";
import { format, formatDate, parse } from "date-fns";

type VotingTimeWindowEditorProps = {
  voting: Voting,
  onSubmitTimeWindow: (d: Date, dur: number) => Promise<boolean>
}

export function VotingTimeWindowEditor({voting, onSubmitTimeWindow}: VotingTimeWindowEditorProps) {

  const [startDate, setStartDate] = useState<Date|undefined>(voting.starts);
  const [startTime, setStartTime] = useState<Date|undefined>(voting.starts);

  const [durationInMinutes, setDurationInMinutes] = useState<number|undefined>(getDurationInMinutes(voting.starts, voting.terminates));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async () => {
    if (startDate && startTime && durationInMinutes) {
      const success = await onSubmitTimeWindow(mergeDateAndTime(startDate, startTime), durationInMinutes);
      setIsModalOpen(false);
    }
  }

  return(
    <div style={{marginBottom: 20}}>

      {voting
        ? <SubSubTitle title={voting.displayId} />
        : <div />
      }

      {voting
        ? <RVotingTimeWindow voting={voting} />
        : <div />
      }

      <Button onClick={() => setIsModalOpen(true) }>Edit</Button>

      <Modal
          width={"90%"}
          title="Edit Voting Time Window"
          open={isModalOpen} 
          onOk={onSubmit}
          okButtonProps={{disabled: ! (startDate && startTime && durationInMinutes)}}
          onCancel={ () => setIsModalOpen(false) }>

            <SubSubTitle title="Start Date and Time" />
            <div className="itc-row">
              <DateFnsPicker
                defaultValue={startDate} 
                onChange={(newDate) => setStartDate(newDate)}
              />

              <TimeFnsPicker 
                defaultValue={startDate}
                onChange={(newDate) => setStartTime(newDate)}
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

function mergeDateAndTime(date1: Date, date2: Date) {
  const dayFromFirstDate = format(date1, 'yyyy-MM-dd');
  const timeFromSecondDate = format(date2, 'HH:mm:ss');

  // Combine the components into a new date string
  const combinedDateString = `${dayFromFirstDate}T${timeFromSecondDate}`;

  // Parse the new date string back into a Date object
  return parse(combinedDateString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
}

function RVotingTimeWindow({voting}: {voting: Voting}) {

  const {starts, terminates} = voting;
  const durationInMinutes = (starts && terminates) ? (terminates.getTime() - starts.getTime()) / 60000 : undefined;

  if (starts) {
    return(
      <Descriptions 
        style={{marginTop: 10, marginBottom: 20}}
        column={1}
        size="small"
        bordered={true}
      >
        <Descriptions.Item label="Voting starts at">{starts ? fmtDateAndTime(starts, ENGLISH, "long") : ""}</Descriptions.Item>
        <Descriptions.Item label="Voting ends at">{terminates ? fmtDateAndTime(terminates, ENGLISH, "long") : ""}</Descriptions.Item>
        <Descriptions.Item label="Duration">{durationInMinutes} Minutes</Descriptions.Item>
      </Descriptions>
    );
  }
  else {
    return <div />;
  }
}

/*
      <div>
        { + starts ? fmtDateAndTime(starts, ENGLISH, "long") : <div />}
        {durationInMinutes ? <div>Duration: {durationInMinutes} Minutes</div> : <div />}
        {terminates ? fmtDateAndTime(terminates, ENGLISH, "long") : <div />}
      </div>

*/

function getDurationInMinutes(start?: Date, end?: Date) : number | undefined {
  return(
    (start && end) ? (end.getTime() - start.getTime()) / 60000 : undefined
  );
}