
import { ReactNode } from "react";
import { Styling } from "./StylingConstants";

type BoxProps = {
//  children: JSX.Element | JSX.Element[],
  type?: "edit",
  title?: string,
  toTheRight?: JSX.Element,
  toTheBottomRight?: JSX.Element
  children: ReactNode
}

export function MyBox({type, children, toTheRight, toTheBottomRight}: BoxProps) {
  const basicStyle = {
    border: "solid", 
    borderWidth: 1, 
    borderColor: type === "edit" ? 'rgb(197, 108, 78)' : "#254e5c", 
    padding: 20, 
    marginBottom: Styling.SMALL_V_SPACE,
//    width: Styling.SCREEN_WIDTH
  }
  if (toTheRight) {
    return(
      <div style={basicStyle} >
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between'}}>
            <div>{children}</div>
            {toTheRight ? toTheRight : <div />}
        </div>
        {toTheBottomRight ? <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>{toTheBottomRight}</div> : <div /> }
      </div>
    );
  }
  else {
    return(
      <div style={basicStyle}>{children}</div>
    )

  }
}
