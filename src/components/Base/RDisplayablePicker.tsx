import { Modal, Select } from "antd";
import { Displayable } from "../../data/Datastore/ModelsWeb/Base/Displayable";
import { Styling } from "./StylingConstants";
import { useState } from "react";
import { RButton } from "./Buttons";


type RDisplayablePickerProps<T extends Displayable> = {
  title?: string,
  placeholder?: string,
  selectedItem: T|undefined,
  setSelectedItem: (item: T) => void,
  items: T[],
  render?: (item: T) => JSX.Element,
}

export function RDisplayablePicker<T extends Displayable>({title, items, selectedItem, setSelectedItem, render, placeholder}: RDisplayablePickerProps<T>) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  /* 
    NOTE: Weil die Select options strings sein müssen, wird auch das currentSelectedItem als string
    (=> displayId) definiert
  */
  const [currentSelectedItem, setCurrentSelectedItem] = useState<string>(
    selectedItem ? selectedItem.displayId : ""
  );

  const getOption = (item: T) => ({
    value: item.displayId, 
    label: render ? render(item) : item.displayId
  })

  const options = items.map(getOption);

  const renderIt = (item: T|undefined) => {
    if (item) {
      return render ? render(item) : <div>{item.displayId}</div>;
    }
    else {
      return <div>{placeholder || "Select"}</div>;
    }
  }

  return(
    <div>

      <RButton 
          type="select"
          label={renderIt(selectedItem)}
          onClick={() => { setIsModalOpen(true) }} />

      <Modal
        width={"90%"}
        title={title || "Select from list"}
        open={isModalOpen} 
        onOk={() => { 
            if (currentSelectedItem) {
              const item = items.find(({displayId}) => displayId === currentSelectedItem);
              if (item) {
                setSelectedItem(item);
              }
            }
            setIsModalOpen(false);
          }}
        okButtonProps={{disabled: ! currentSelectedItem}}
        onCancel={ () => setIsModalOpen(false) }
        >
        <Select
          style={{minWidth: Styling.SCREEN_WIDTH}}
          value={currentSelectedItem}
          onChange={(did: string) => { setCurrentSelectedItem(did) }}
          options={options}
        />
      </Modal>

    </div>
  );
}
