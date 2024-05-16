import { useEffect, useState } from "react";
import { Button, Checkbox, Input, Modal, Radio, Select } from "antd";

import './ShortPosts.css'
import { PageTitle, SubSubTitle } from "../Base/Base";
import { useLocation } from "react-router-dom";
import { DsShortPost } from "../../models";
import { ShortPost, ShortPostBlock, ShortPostModifier } from "../../data/Datastore/ModelsCommon/ShortPost/ShortPostTypes";
import { HelpBox } from "./HelpBox";
import { ShortPostInit } from "../../data/Datastore/ModelsWeb/Base/InitTypes";
import { xSaveOrUpdate } from "../../data/Datastore/ModelsWeb/Base/xSaveOrUpdate";
import { saveShortPost } from "../../data/Datastore/ModelsWeb/ShortPost/ShortPostCUD";
import { ENGLISH } from "../../util/common/language";
import { fmtDate } from "../../util/common/dateTime/Localized";
import { getDSShortPost, stageShortPost } from "../../data/Datastore/ModelsCommon/ShortPost/ShortPosts";
import { xGetStaged } from "../../data/Datastore/ModelsCommon/Base/xGetStaged";
import { DsPublicationStatus } from "../../models";
import { format, set } from "date-fns";
import { itcAssert } from "../../util/common/general/tests";
import { RIconButton } from "../Base/Buttons";

const publicationStatusLookup = new Map<string, DsPublicationStatus>([
  ["Draft", DsPublicationStatus.DRAFT],
  ["Publish upon notification", DsPublicationStatus.SUBMITTED],
  ["Publish silently", DsPublicationStatus.PUBLISHED]
])

export function ShortPostEditor() {

  const { state } = useLocation();
  const { id } = state || { id: "" };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [shortPost, setShortPost] = useState<ShortPost|undefined>(undefined);

  useEffect(() => {
      const load = async () => {
        const post = await xGetStaged(
              ENGLISH,
              getDSShortPost,
              id,
              stageShortPost
        );
        if (post) { 
          setShortPost(post);
          setTitle(post.title);
          setBody(formatShortPostBody(post.blocks));
        }  
      }
      if (id) { load() };
    },
    [id]
  );

  const [publicationStatus, setPublicationstatus] = useState<string>("Publish upon notification");
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const submit = () => {
    setIsModalOpen(true);
  }


  const savePost = () => {
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
    xSaveOrUpdate<ShortPostInit, DsShortPost>(
      getDSShortPost,
      DsShortPost.copyOf,
      saveShortPost,
      id,
      input
    );
  };

  const toJson = (pretty?: boolean) => {
    const rawPost = {
      title,
      body: parseShortPostBody(body)
    };
    return pretty
      ? JSON.stringify(rawPost, undefined, 2)
      : JSON.stringify(rawPost)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(toJson());
  }

  return (

    <div >
  
      <PageTitle title={id ? "Edit Short Post" : "New Short Post"} />

      <HelpBox />

      <div className="itc-boxed gaf-secondary-box">
        
        <SubSubTitle title="Title" />
        <Input 
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="title"
        />

        <SubSubTitle title="Body" />
        <Input.TextArea
            value={body}
            onChange={handleInputChange}
            placeholder="body"
            autoSize={{ minRows: 8 }}
        />

        {/* <SubSubTitle title="Publication Status" />

        <Select
          style={{width: 240}}
          defaultValue={publicationStatus}
          onChange={(v) => { setPublicationstatus(v); }}
          options={Array.from(publicationStatusLookup.keys()).map(
            key => ({value: key, label: key}))
          }
        /> */}

      </div>

      <SubSubTitle title="Parsed object:" />
      <pre className={"json-box"}>{toJson(true)}</pre>

      <div className="itc-row">
        <RIconButton icon="copy" onClick={copyToClipboard} />
        <Button 
            type="primary"
            style={{minWidth: 200}}
            onClick={submit} 
            disabled={title.length < 3 || body.length < 10}
        >Submit</Button>
        <div>
          {title.length < 3 ? <div>The Title must be at least 3 characters long</div> : <div />}
          {body.length < 10 ? <div>The Body must be at least 10 characters long</div> : <div />}          
        </div>

      </div>

      <Modal 
          width={"90%"}

          title="Confirm Save Post" 
          open={isModalOpen} 
          onOk={() => { savePost(); setIsModalOpen(false); }}
          onCancel={ () => setIsModalOpen(false) }>
        <pre className={"json-box"}>{toJson(true)}</pre>
      </Modal>
    </div>

  );
};

function parseShortPostBody(text: string) : ShortPostBlock[] {

  let result = [] as ShortPostBlock[];

  const paragraphs = text.split("\n\n").map(p => p.trim());

  for (var paragraph of paragraphs) {
    if (paragraph) {
      result = result.concat(parseShortPostBodyParagraph(paragraph));
    }
  }
  return result;
}

function parseShortPostBodyParagraph(paragraph: string) : ShortPostBlock[] {

  const lines = paragraph.split("\n").map(p => p.trim());
  const result = [] as ShortPostBlock[];

  let modifier: ShortPostModifier, newPar = true;
  for (var line of lines) {
    if (line) { // ignore empty lines
      if (line.startsWith("b:")) {
        modifier = "b";
        line = JSON.stringify(line.substring(2).trim());
      }
      else if (line.startsWith("vl:")) {
        modifier = "vl";
        line = _getJSONReady(line.substring(3).trim(), ['platform', 'videoId', 'startTimeInSeconds']);
      }
      else if (line.startsWith("wl:")) {
        modifier = "wl";
        line = _getJSONReady(line.substring(3).trim(), ['label', 'url']);
      }
      else {
        modifier = "txt";
      }
      result.push({modifier, newPar, text: line});
      newPar = false;
    }
  }
  
  return result;
}

function formatShortPostBody(blocks: ShortPostBlock[]) : string {

  let result = "", firstPar = true;

  for (var {modifier, text, newPar} of blocks) {
    if (newPar) {
      if (firstPar) {
        firstPar = false;
      }
      else {
        result += "\n";
      }
    }
    switch (modifier) {
      case "txt": result += text + "\n"; break;
      case "b": result += "b: " + text + "\n"; break;
      case "vl": result += "vl: " + text + "\n"; break;
      case "wl": result += "wl: " + text + "\n"; break;
    }
  }
  return result;
}


export function RShortPost({post}: {post: ShortPost}) {
  return(
    <div>
      <div>{fmtDate(post.publishDate, ENGLISH, "short")}</div>
      {post.blocks.map(({modifier, text}: ShortPostBlock) => <div><div>modifier: {modifier}</div><div>text: {text}</div></div>)}
    </div>
  )
}

export function _getJSONReady(s: string, keys: string[]) {
  let result = s;
  for (let key of keys) {
    result = result.replace(key, `\"${key}\"`);
  }
  return result;
}

/* NEW EXAMPLE:

This is the first paragraph of our example.

Here comes the second paragraph. It includes some bullets:
b: namely this one
b: and a second one.

The next paragraph then includes a video link:
vl: {platform: "YOUTUBE", videoId: "8z5HkP_N8WY", startTimeInSeconds: 120}
and a Web link:
wl: {label: "Visit Géza Anda Homepage, url: "https://geza-anda.ch/}

This fourth paragraph concludes our example.

*/





/*
function parseShortPostBody_COPY(text: string) : ShortPostBlock[] {
  //  const blocks = [] as {modifier: ShortPostModifier, text: string}[];
  
  
    const separators = new Map<string, ShortPostModifier>([
      ["\n\n", "p"],
      ["\nb:", "b"],
      ["\nvl:", "vl"],
      ["\nwl", "wl"]
    ]);
  
    const separators0 = ["\n\n", "\nb:", "\nvl:", "\nwl"];
  
    const regx = new RegExp(`(${Array.from(separators.keys()).join("|")})`, 'g');
  
    const fragments = text.split(regx);
  
  //  console.log("fragments", fragments);
  
    // Initialize an array to store the result
    const result = [] as ShortPostBlock[];
    
    // Initialize the index to keep track of the last separator used
    let modifier = "p" as ShortPostModifier;
    
    fragments.forEach(fragment => {
      // If the part is a separator, add it to the result with the index of the separator
      if (separators.has(fragment)) {
        modifier = separators.get(fragment) || "txt";
      }
      else {
        const frgmt = fragment.trim(); // eliminates whitespace including newlines from beginning and end of string
        const parts = frgmt.split("\n").map(s => s.trim());
  
        if (parts.length > 0) {
          // If the part is not a separator, add it to the result and update the last separator index
          result.push({ modifier, text: parts[0] });
          for (let i = 1; i < parts.length; i++) {
            result.push({ modifier: "txt", text: parts[i] });
          }
        }
      }
    });
    
    return result;
  }
  */