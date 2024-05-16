import { Modal } from "antd";
import { MyBox } from "./MyBox";
import { RIconButton, SubmitCancelButtons } from "./Buttons";

type ConfirmDialogProps<T> = {
  data: T,
  onSubmit: (data: T) => void,
  onCancel?: () => void,
  disabled?: boolean,
  isModalOpen: boolean,
  setIsModalOpen: (flag: boolean) => void
  renderData: (data: T) => JSX.Element
}

export function ConfirmAndSubmit<T>({data, onSubmit, onCancel, disabled, isModalOpen, setIsModalOpen, renderData}: ConfirmDialogProps<T>) {

  const copyToClipboardButton = 
    <RIconButton icon="copy" onClick={() => navigator.clipboard.writeText(JSON.stringify(data))} />

  return(
    <div>
      <div style={{marginTop: 20}}>
      
        <SubmitCancelButtons
          onSubmit={() => { setIsModalOpen(true); }}
          onCancel={onCancel}
          disabled={!! disabled}
        />
      </div>

    <Modal
//      width={"90%"}
      title="Confirm Save" 
      open={isModalOpen} 
      onOk={() => { onSubmit(data); setIsModalOpen(false); }}
      onCancel={ () => setIsModalOpen(false) }
    ><MyBox toTheRight={copyToClipboardButton} >{renderData(data)}</MyBox>
    </Modal>

    </div>

  )
}