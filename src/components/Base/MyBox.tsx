import { Button } from "antd"
import { ReactNode } from "react";

type BoxProps = {
//  children: JSX.Element | JSX.Element[],
  toTheRight?: JSX.Element,
  children: ReactNode
}

export function MyBox({children, toTheRight}: BoxProps) {
  const basicStyle = {
    border: "solid", borderWidth: 1, borderColor: "#254e5c", 
    padding: 20, marginBottom: 10
  }
  if (toTheRight) {
    return(
      <div style={{...basicStyle, display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <div>{children}</div>
          {toTheRight ? toTheRight : <div />}
      </div>
    );
  }
  else {
    return(
      <div style={basicStyle}>{children}</div>
    )

  }
}
