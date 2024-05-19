import { Button } from "antd";
import { CopyOutlined, DeleteOutlined, EditOutlined, EnterOutlined, PlusCircleOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import { Styling } from "./StylingConstants";

type RButtonProps = {
  icon?: JSX.Element
  label: string | JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  type?: "select";
};

export function RButton({ label, icon, onClick, disabled, type }: RButtonProps) {
  if (type === "select") {
    return (
      <Button
        icon={icon}
        type="primary"
        style={{ borderRadius: 0, backgroundColor: 'white', color: 'black' }}
        onClick={onClick}
        disabled={disabled}
      >{label}</Button>
    );
  }
  else {
    return (
      <Button
        icon={icon}
        type="primary"
        style={{ minWidth:  120 }}
        onClick={onClick}
        disabled={disabled}
      >{label}</Button>
    );
  }
}

type SubmitCancelButtonsProps = {
  onSubmit: () => void,
  onCancel?: () => void,
  disabled?: boolean
};

export function SubmitCancelButtons({onSubmit, onCancel, disabled}: SubmitCancelButtonsProps) {
  return(
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      {
        onCancel
          ? 
            <RButton
              label="Cancel"
              onClick={onCancel}
            />
          : <div />
        }
      <RButton
        label="Submit"
        onClick={onSubmit} 
        disabled={!! disabled}
      />
    </div>
  )
}

export type RIconButtonProps = {
  icon: "remove" | "add" | "edit" | "edit-video" | "go-back" | "copy";
  size?: "normal" | "big";
  label?: string | JSX.Element;
  onClick: () => void;
  disabled?: boolean;
};


export function RIconButton({ label, onClick, disabled, icon, size }: RIconButtonProps) {

  const effSize = size === "big" ? 32 : 24;
  const style = { fontSize: effSize, color: Styling.PRIMARY_COLOR };
  let iconElement;
  switch (icon) {
    case "add": iconElement = <PlusCircleOutlined style={style} />; break;
    case "remove": iconElement = <DeleteOutlined style={style} />; break;
    case "edit": iconElement = <EditOutlined style={style} />; break;
    case "edit-video": iconElement = <VideoCameraAddOutlined style={style} />; break;
    case "go-back": iconElement = <EnterOutlined style={style} />; break;
    case "copy": iconElement = <CopyOutlined style={style} />; break;
  }

  return (
    <Button
      type="primary"
      style={{
        background: 'rgba(0,0,0,0)',
        color: 'rgb(22,119,255',
        borderWidth: 0,
        width: effSize + 10,
        height: effSize + 10
      }}
      icon={iconElement}
      onClick={onClick}
      disabled={disabled}
    >{label || ""}</Button>
  );
}
