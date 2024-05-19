import { useEffect, useState } from "react";
import { DsShortPost } from "../../models";
import { SubSubTitle } from "../Base/Base";
import { ShortPost, ShortPostBlock } from "../../data/Datastore/ModelsCommon/ShortPost/ShortPostTypes";
import { xGetStagedList } from "../../data/Datastore/ModelsCommon/Base/xGetStaged";
import { getDSShortPost, getDSShortPosts, stageShortPost } from "../../data/Datastore/ModelsCommon/ShortPost/ShortPosts";
import { ENGLISH } from "../../util/common/language";
import { fmtDate } from "../../util/common/dateTime/Localized";
import { RIconButton } from "../Base/Buttons";
import { MyBox } from "../Base/MyBox";
import { EditShortPost } from "./EditShortPost";
import { Button, Modal } from "antd";
import { xDelete } from "../../data/Datastore/ModelsWeb/Base/xDelete";

export function RShortPosts({triggerReload}: {triggerReload?: boolean}) {

  const [data, setData] = useState<ShortPost[]>([]);
  const [anotherTriggerReload, setAnotherTriggerReload] = useState(false);

  useEffect(() => {
      const load = async () => {
        const newData = await xGetStagedList<DsShortPost, ShortPost>(ENGLISH, getDSShortPosts, stageShortPost);

        if (newData) { setData(newData); }
      }
      load();
    },
  [triggerReload, anotherTriggerReload]);

  return(
      <div>
        <div>
          {data.map((post: ShortPost, i: number) => {
            return <RShortPost 
                      post={post} 
                      onUpdate={ () => { setAnotherTriggerReload(! anotherTriggerReload); } }
                    />
          })}
        </div>
      </div>
  );
}

function RShortPost({ post, onUpdate }: { 
    post: ShortPost, 
    onUpdate: () => void
  })
{
  const { publishDate, title, blocks } = post;
  const [isEditMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyToClipboardButton = 
    <RIconButton icon="copy" onClick={() => navigator.clipboard.writeText(JSON.stringify(post))} />

  const deletePost = async (post: ShortPost) => {
    await xDelete(getDSShortPost, post.id);
    onUpdate();
  }

  if (isEditMode) {
    return (
      <EditShortPost shortPost={post} closeIt={() => { setEditMode(false); }} onUpdate={onUpdate} />
    );
  }
  else {
    return (
      <MyBox toTheRight={[
        <RIconButton icon="edit" onClick={() => { setEditMode(true); } } />,
        <RIconButton icon="remove" onClick={() => { setIsModalOpen(true); }} />
      ]}>

        {/* <div>
                          <RBoldText text={`Status: ${publicationStatus}`} />
                        </div>
                  
                        <div>
                          <RBoldText text={"category: " + category} />
                        </div> */}

        {/* <div>Published: {fmtDate(publishDate, ENGLISH, "short")}, {fmtTime(publishDate, ENGLISH)}</div> */}
        <RenderShortPost title={title} publishDate={fmtDate(publishDate, ENGLISH, "short") || ""} blocks={blocks} />
{/* 
        <SubSubTitle title={title} />
        <div>Published: {fmtDate(publishDate, ENGLISH, "short")}</div>

        {blocks.map((block: ShortPostBlock, i: number) => <div key={"block-" + i}>
          <RShortPostBlock block={block} />
        </div>)} */}

        <Modal 
          width={"90%"}
          title="Delete permanently?" 
          open={isModalOpen} 
          onOk={() => { deletePost(post); }}
          onCancel={ () => setIsModalOpen(false) }>
            {blocks 
                ? <MyBox toTheRight={copyToClipboardButton} ><RenderShortPost title={post.title} blocks={post.blocks} /></MyBox>
                : <div />
            }
        </Modal>

      </MyBox>
    );
  }
}

export function RenderShortPost({title, publishDate, blocks}: {title: string, publishDate?: string, blocks: ShortPostBlock[]}) {
  return(
    <div>
      <SubSubTitle title={title} />
      {publishDate ? <div>Published: {publishDate}</div> : <div />}

      {blocks.map((block: ShortPostBlock, i: number) => <div key={"block-" + i}>
        <RShortPostBlock block={block} />
      </div>)}

    </div>
  )

}

function RShortPostBlock({ block }: { block: ShortPostBlock; }) {
  const { modifier, text, newPar } = block;
  let s;
  switch (modifier) {
    case "txt": s = <div>{text}</div>; break;
    case "b": s = <div>&#x2022; {text}</div>; break;
    case "vl": 
      const {videoId, startTimeInSeconds} = JSON.parse(text);
      s = <div>Video link with id {videoId} starting at {startTimeInSeconds} seconds</div>;
      break;
    case "wl": 
      const {label, url} = JSON.parse(text);
      s = <div>web link with label {label} and url {url}</div>;
      break;
  }
  return (newPar ? <p>{s}</p> : <div>{s}</div>);
}

