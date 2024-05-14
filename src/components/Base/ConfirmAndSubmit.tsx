import { Button, Modal } from "antd";
import { MyBox } from "./MyBox";
import { RButton } from "./Base";

type ConfirmDialogProps<T> = {
  data: T,
  onSubmit: (data: T) => void
  disabled?: boolean,
  isModalOpen: boolean,
  setIsModalOpen: (flag: boolean) => void
  renderData: (data: T) => JSX.Element
}

export function ConfirmAndSubmit<T>({data, onSubmit, disabled, isModalOpen, setIsModalOpen, renderData}: ConfirmDialogProps<T>) {



  const copyToClipboardButton = 
    <Button onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}>Copy to Clipboard</Button>        


  return(
    <div>
            <div style={{marginTop: 20}}>
        <RButton
          label="Submit"
          onClick={() => { setIsModalOpen(true); }} 
          disabled={!! disabled}
        />
      </div>

    <Modal
      width={"90%"}
      title="Confirm Save" 
      open={isModalOpen} 
      onOk={() => { onSubmit(data); setIsModalOpen(false); }}
      onCancel={ () => setIsModalOpen(false) }
    ><MyBox toTheRight={copyToClipboardButton} >{renderData(data)}</MyBox>
    </Modal>

    </div>

  )
}