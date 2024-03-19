import { useEffect, useState } from "react";
import { Button, Checkbox, Input, Modal } from "antd";

import './ShortPosts.css'
import { PageTitle, SubSubTitle } from "../Base/Base";
import { useLocation } from "react-router-dom";
import { DsGenericItem } from "../../models";
import { getDsGenericItem } from "../../data/Datastore/ModelsCommon/Generic/GenericR";
import { ShortPost, ShortPostBlock, ShortPostFromJson, ShortPostModifier } from "../../data/Datastore/ModelsCommon/Generic/ShortPostTypes";
import { HelpBox } from "./HelpBox";
import { GenericItemInit } from "../../data/Datastore/ModelsWeb/Base/InitTypes";
import { xSaveOrUpdate } from "../../data/Datastore/ModelsWeb/Base/xSaveOrUpdate";
import { saveGenericItem } from "../../data/Datastore/ModelsWeb/Generic/GenericCUD";
import { ENGLISH } from "../../util/common/language";
import { fmtDate } from "../../util/common/dateTime/Localized";


export function ShortPostEditor() {

  const { state } = useLocation();
  const { id } = state || { id: "" };
  const mode = id ? "Update" : "Create";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dbPost, setDbPost] = useState<DsGenericItem|undefined>(undefined);

  useEffect(() => {
      const load = async () => {
        const post = await getDsGenericItem(id);
        if (post) { 
          setDbPost(post);
          setActive(post.isActive || false);
          const content = post.textField?.en_US;
          if (content) {
            const { title: title0, blocks } = JSON.parse(content) as ShortPostFromJson;
            setTitle(title0);
            setBody(formatShortPostBody(blocks));
          }
        }  
      }
      if (id) { load() };
    },
    [id]
  );

  const [isActive, setActive] = useState<boolean>(true);
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
    const pDateStr = pDate.toISOString();

    const displayId = dbPost ? dbPost.displayId : pDateStr + " / " + title;

    const content = JSON.stringify({
      publishDate: pDateStr,
      title,
      blocks: parseShortPostBody(body)
    });

    const input = {
      displayId,
      isActive,
      textField: {en_US: content, de_DE: content, fr_FR: content}
    };

    // saves new post or updates existing one, depending on whether id is falsy
    xSaveOrUpdate<GenericItemInit, DsGenericItem>(
      getDsGenericItem,
      DsGenericItem.copyOf,
      saveGenericItem,
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

        <Checkbox value={isActive} onChange={() => { setActive(! isActive); }}>Post is active</Checkbox>;

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
        
      </div>

      <SubSubTitle title="Parsed object:" />
      <pre className={"json-box"}>{toJson(true)}</pre>

      <div className="itc-row">
        <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
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



// function ShortPosts() {
//   return(
//     <ShortPostEditor />
//   );
// }

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
        line = line.substring(2).trim();
      }
      else if (line.startsWith("vl:")) {
        modifier = "vl";
        line = line.substring(3).trim();
      }
      else if (line.startsWith("wl:")) {
        modifier = "wl";
        line = line.substring(3).trim();
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