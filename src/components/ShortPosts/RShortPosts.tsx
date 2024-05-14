import { Divider } from "antd";
import { ShortPostEditor } from "./ShortPostEditor";
import { ShortPostsHistory } from "./ShortPostsHistory";


export function RShortPosts() {
  return(
    <div>
      <ShortPostEditor />
      <Divider orientation="left" style={{color: 'black'}}>bisher publiziert</Divider>
      <ShortPostsHistory />
    </div>
  )
}