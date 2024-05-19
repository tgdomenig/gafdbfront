import { Divider } from "antd";
import { RShortPosts } from "./RShortPosts";
import { HelpBox } from "./HelpBox";
import { EditShortPost } from "./EditShortPost";
import { PageTitle } from "../Base/Base";
import { RIconButton } from "../Base/Buttons";
import { useState } from "react";


export function RShortPostsScreen() {

  const [editorOpen, setEditorOpen] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  
  return(
    <div>
      <PageTitle title={"Short Posts"} />
      <HelpBox />
      {
        editorOpen 
          ? <EditShortPost closeIt={() => { setEditorOpen(false); }} onUpdate={() => { setTriggerReload(! triggerReload); }}/> 
          : <RIconButton icon="add" onClick={() => { setEditorOpen(true); }} />
      }
      
      <Divider orientation="left" style={{color: 'black'}}>bisher publiziert</Divider>
      <RShortPosts triggerReload={triggerReload} />
    </div>
  )
}

