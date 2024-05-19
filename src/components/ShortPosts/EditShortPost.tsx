import { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";

//import './ShortPosts.css'
import { RBoldText, SubSubTitle } from "../Base/Base";
import { DsShortPost } from "../../models";
import { ShortPost, ShortPostBlock } from "../../data/Datastore/ModelsCommon/ShortPost/ShortPostTypes";
import { ShortPostInit } from "../../data/Datastore/ModelsWeb/Base/InitTypes";
import { xSaveOrUpdate } from "../../data/Datastore/ModelsWeb/Base/xSaveOrUpdate";
import { saveShortPost } from "../../data/Datastore/ModelsWeb/ShortPost/ShortPostCUD";
import { ENGLISH } from "../../util/common/language";
import { fmtDate } from "../../util/common/dateTime/Localized";
import { getDSShortPost } from "../../data/Datastore/ModelsCommon/ShortPost/ShortPosts";
import { DsPublicationStatus } from "../../models";
import { format, set } from "date-fns";
import { RIconButton, SubmitCancelButtons } from "../Base/Buttons";
import { MyBox } from "../Base/MyBox";
import { checkSyntax, formatShortPostBody } from "./Parsing";
import { parseShortPostBody } from "./Parsing";
import { RenderShortPost } from "./RShortPosts";


const publicationStatusLookup = new Map<string, DsPublicationStatus>([
  ["Draft", DsPublicationStatus.DRAFT],
  ["Publish upon notification", DsPublicationStatus.SUBMITTED],
  ["Publish silently", DsPublicationStatus.PUBLISHED]
])



export function EditShortPost({shortPost, closeIt}: {
  shortPost?: ShortPost, 
  closeIt?: () => void, 
  onUpdate: (updated: DsShortPost) => void}) {

  const id = shortPost ? shortPost.id : undefined;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [publicationStatus, setPublicationstatus] = useState<string>("Publish upon notification");
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const [blocks, setBlocks] = useState<ShortPostBlock[]|undefined>(undefined);

  useEffect(() => {
    if (shortPost) {
      setTitle(shortPost.title);
      setBody(formatShortPostBody(shortPost.blocks));
    }
  }, [shortPost]);


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const submit = () => {
    try {
      checkSyntax(body);
      setBlocks(parseShortPostBody(body));
      setErrorMsg("");
      setIsModalOpen(true);
    }
    catch (e) {
      // @ts-ignore
      setErrorMsg(e.message);
    }
  }


  const savePost = async () => {
    const pDate = new Date(); // current time is used as publish date

    /*
    Bemerkung:
    Leider ist das Feld PublishDate in der DB vom Typ AWSDate statt AWSDateTime. 
    Die Nachrichten sollten aber auf DateTime sortiert werden.
    Die lassen die DB Struktur vorläufig unverändert und fügen statt dessen das Publikationsdatum inkl. Zeit zur DisplayId hinzu.
    */
    const pDateStr = format(pDate, 'yyyy-MM-dd');
    const pDateTimeStr = format(pDate, 'yyyy-MM-dd HH:mm:ss');

    const publicationStatusDS = publicationStatusLookup.get(publicationStatus) as DsPublicationStatus;

    const displayId = shortPost ? shortPost.displayId : pDateTimeStr + " / " + title;

    const content = JSON.stringify({
      title,
      blocks: parseShortPostBody(body)
    });

    const input = {
      displayId,
      publishDate: pDateStr,
      publicationStatus: DsPublicationStatus[publicationStatusDS],
      category: "ConcoursNews",
      textField: {en_US: content, de_DE: content, fr_FR: content}
    };

    // saves new post or updates existing one, depending on whether id is falsy
    await xSaveOrUpdate<ShortPostInit, DsShortPost>(
      getDSShortPost,
      DsShortPost.copyOf,
      saveShortPost,
      shortPost ? shortPost.id : "",
      input
    );
  };

  // const toJson = (pretty?: boolean) => {
  //   const rawPost = {
  //     title,
  //     body: parseShortPostBody(body)
  //   };
  //   return pretty
  //     ? JSON.stringify(rawPost, undefined, 2)
  //     : JSON.stringify(rawPost)
  // }

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(toJson());
  // }

  const copyToClipboardButton = 
    <RIconButton icon="copy" onClick={() => navigator.clipboard.writeText(JSON.stringify({title, body, blocks}))} />


  return (
      <MyBox toTheRight={copyToClipboardButton}>
        
        <SubSubTitle title={shortPost ? "Edit Post" : "New Post"} />
        <Input 
//            style={{minWidth: 800}}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="title"
        />
        <div>
          {title.length < 3 ? <div>The Title must be at least 3 characters long</div> : <div />}
        </div>

        <RBoldText text="Body" />
        <Input.TextArea
            style={{width: '100%'}}
            value={body}
            onChange={handleInputChange}
            placeholder="body"
            autoSize={{ minRows: 8 }}
        />
        <div>
          {body.length < 10 ? <div>The Body must be at least 10 characters long</div> : <div />}          
        </div>

        {/* <SubSubTitle title="Publication Status" />

        <Select
          style={{width: 240}}
          defaultValue={publicationStatus}
          onChange={(v) => { setPublicationstatus(v); }}
          options={Array.from(publicationStatusLookup.keys()).map(
            key => ({value: key, label: key}))
          }
        /> */}


      {/* <SubSubTitle title="Parsed object:" />
      <pre className={"json-box"}>{toJson(true)}</pre> */}

      {errorMsg ? <RBoldText text={errorMsg} /> : <div />}

      <div style={{marginTop: 20}}>
        
        <SubmitCancelButtons
            onSubmit={submit}
            onCancel={closeIt}
            disabled={title.length < 3 || body.length < 10}
          />

      </div>

      <Modal 
          width={"90%"}
          title="Confirm Save Post" 
          open={isModalOpen} 
          onOk={async () => { await savePost(); setIsModalOpen(false); closeIt && closeIt() }}
          onCancel={ () => setIsModalOpen(false) }>
            {blocks 
                ? <MyBox toTheRight={copyToClipboardButton} ><RenderShortPost title={title} blocks={blocks} /></MyBox>
                : <div />
            }
      </Modal>




  </MyBox>
  );
};

 /*
      type ConfirmDialogProps<T> = {
  data: T,
  onSubmit: (data: T) => void,
  onCancel?: () => void,
  disabled?: boolean,
  isModalOpen: boolean,
  setIsModalOpen: (flag: boolean) => void
  renderData: (data: T) => JSX.Element
  */


export function RShortPost({post}: {post: ShortPost}) {
  return(
    <div>
      <div>{fmtDate(post.publishDate, ENGLISH, "short")}</div>
      {post.blocks.map(({modifier, text}: ShortPostBlock) => <div><div>modifier: {modifier}</div><div>text: {text}</div></div>)}
    </div>
  )
}

