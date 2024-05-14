import { Button } from "antd";
import { isFalseOrEmpty } from "../../util/common/general/tests";

export default function ShowJson({data}: {data: Object | undefined}) {

  if (isFalseOrEmpty(data)) {
    return(<div>No Data</div>);
  }
  else {
    const dataJson = JSON.stringify(data, undefined, 2);
    return(
      <div style={styles.container}>
        <div style={styles.topline}>
          <Button onClick={() => navigator.clipboard.writeText(dataJson)}>Copy to Clipboard</Button>        
          {Array.isArray(data) ? <div>Number of Records: {data.length}</div> : <div>Not an Array</div>}

        </div>
        <pre>{dataJson}</pre>            
      </div>
    );
  } 
}

const styles = {
  container: {
    borderWidth: 1, 
    borderColor: '#dadada', 
    borderStyle: 'solid', 
    padding: 5, 
    marginTop: 20, 
    maxWidth: 800
  } as React.CSSProperties,
  topline: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingBottom: 10,
    borderBottom: 1, 
    borderBottomColor: '#dadada', 
    borderBottomStyle: 'solid'
  } as React.CSSProperties
}