import { Radio, RadioChangeEvent, Select } from "antd";
import { Styling } from "../Base/StylingConstants";
import { RoundDisplayIdType, RoundDisplayIds } from "../Base/Helpers";


type SelectRoundProps = {
  onChange: (roundDid: RoundDisplayIdType) => void
}

export function SelectRound({onChange}: SelectRoundProps) {

  const options = RoundDisplayIds.map(did => ({value: did, label: did}));

  return(
    <div style={{marginBottom: 20}}>
      <Radio.Group optionType="button" buttonStyle="solid" options={options} onChange={({ target: { value } }: RadioChangeEvent) => onChange(value)} />
    </div>
  )
}