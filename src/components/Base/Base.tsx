import { Typography } from "antd";


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
    <Typography.Title level={5}>{title}</Typography.Title>
  )
}

export function RBoldText({text}: {text: string}) {
  return(
    <Typography.Text strong={true}>{text}</Typography.Text>
  )
}
