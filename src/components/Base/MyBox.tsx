
import { ReactNode } from "react";
import { Styling } from "./StylingConstants";
import { SubTitle } from "./Base";

type BoxProps = {
//  children: JSX.Element | JSX.Element[],
  type?: "edit",
  title?: string,
  toTheRight?: JSX.Element | JSX.Element[],
  toTheBottomRight?: JSX.Element
  children: ReactNode
}

export function MyBox({type, title, children, toTheRight, toTheBottomRight}: BoxProps) {
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
        {title ? <SubTitle title={title} /> : <div />}
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between'}}>
            <div style={{flex: 5}}>{children}</div>
            <RToTheRight toTheRight={toTheRight} />
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

function RToTheRight({toTheRight}: {toTheRight: JSX.Element | JSX.Element[]}) {
  if (Array.isArray(toTheRight)) {
    return(
      <div>
        {toTheRight.map((el: JSX.Element, i: number) => <div key={"ttr-" + i}>{el}</div>)}
      </div>
    )
  }
  else {
    return toTheRight;
  }
}
