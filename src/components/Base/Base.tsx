
import { DeleteFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button, Typography } from "antd";


export function PageTitle({title}: {title: string}) {
  return(
    <Typography.Title level={2}>{title}</Typography.Title>
  )
}

export function SubTitle({title}: {title: string}) {
  return(
    <Typography.Title level={4}>{title}</Typography.Title>
  )
}

export function SubSubTitle({title}: {title: string}) {
  return(
    <Typography.Title style={{marginTop: 0}} level={5}>{title}</Typography.Title>
  )
}

export function RBoldText({text}: {text: string}) {
  return(
    <Typography.Text strong={true}>{text}</Typography.Text>
  )
}

type RButtonProps = {
  label: string | JSX.Element
  onClick: () => void
  disabled?: boolean,
  type?: "select"
}

export function RButton({label, onClick, disabled, type}: RButtonProps) {
  if (type === "select") {
    return(
      <Button
        type="primary"
        style={{borderRadius: 0, backgroundColor: 'white', color: 'black'}}
        onClick={onClick} 
        disabled={disabled}
      >{label}</Button>
    )    
  }
  else {
    return(
      <Button
        type="primary"
        style={{minWidth: 200}}
        onClick={onClick} 
        disabled={disabled}
      >{label}</Button>
    )
  }
}

type RIconButtonProps = {
  icon: "remove" | "add",
  size?: "normal" | "big"
  label: string | JSX.Element
  onClick: () => void
  disabled?: boolean
}

export function RIconButton({label, onClick, disabled, icon, size}: RIconButtonProps) {

  const effSize = size === "big" ? 32 : 24;
  const style = {fontSize: effSize};
  const iconElement = icon === "remove" ? <DeleteFilled style={style}/> : <PlusCircleFilled style={style}/>

  return(
    <Button
    type="primary"
      style={{
        background: 'rgba(0,0,0,0)',
        color: 'rgb(22,119,255',
        borderWidth: 0, 
        width: effSize + 10, 
        height: effSize+10
      }}
      icon={iconElement}
      onClick={onClick}
      disabled={disabled}
    >{label}</Button>
  );
}