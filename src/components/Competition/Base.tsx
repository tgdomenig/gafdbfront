import { Select } from "antd";
import { Styling } from "../Base/StylingConstants";
import { RoundDisplayIdType, RoundDisplayIds } from "../Base/Helpers";


type SelectRoundProps = {
  onChange: (roundDid: RoundDisplayIdType) => void
}

export function SelectRound({onChange}: SelectRoundProps) {
  return(
    <Select
      style={{width: Styling.SELECT_WIDTH}}
      onChange={onChange}
      options={RoundDisplayIds.map(did => ({value: did, label: did}))}
    />
  )
}