import { Checkbox, Modal } from "antd";
import ShowJson from "../Base/JsonPP";
import { useState } from "react";
import './styles.css'
import { SubTitle } from "../Base/Base";
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit";
import { RParagraph } from "../Base/RParagraph";

type RSelectProps = {
  what: string, 
  target: string,
  items: string[], // items can be e.g. ids or displayIds
  onSubmit: (items: string[]) => void,
  renderItem?: (item:string) => JSX.Element,
  getDisplayName: (item: string) => string
}

export function RSelectForm({what, target, items, onSubmit, renderItem, getDisplayName}: RSelectProps) {

  const [selection, setSelection] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = items.map((item) => ({label: getDisplayName(item), value: item}));

  return(
    <div style={{padding: 20, backgroundColor: '#DEDEDE'}}>

      <SubTitle title={`Select ${what} for ${target}`} />

      <Checkbox.Group
        options={options} 
        style={{ display: 'flex', flexDirection: 'column' }}
        onChange={ (items: string[]) => setSelection(items)}
      />
      
      <ConfirmAndSubmit<string[]> 
          data={selection} 
          onSubmit={onSubmit}
          disabled={selection.length === 0}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          renderData={(strings: string[]) => <RParagraph content={strings} render={renderItem} />}
      />      
    </div>
  );
}



