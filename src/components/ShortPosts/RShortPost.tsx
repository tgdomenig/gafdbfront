//import { fmtDate, fmtTime } from "../../util/common/dateTime/Localized";
// import { ENGLISH } from "../../util/common/language/Const";
import { RBoldText, SubSubTitle } from "../Base/Base";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ENGLISH } from "../../util/common/language";
import { fmtDate, fmtTime } from "../../util/common/dateTime/Localized";
import { ShortPost, ShortPostBlock } from "../../data/Datastore/ModelsCommon/ShortPost/ShortPostTypes";
import { DsPublicationStatus } from "../../models";

export function RShortPost({ post }: { post: ShortPost; }) {
  const navigate = useNavigate();
  const { id, displayId, category, publishDate, title, blocks, publicationStatus } = post;

  return (
    <div className={`itc-boxed gaf-primary-box ${publicationStatus === DsPublicationStatus.DRAFT ? "" : "itc-inactive-shortpost"}`}>
      <SubSubTitle title={title} />
      
      <div>
        <RBoldText text={`Status: ${publicationStatus}`} />
      </div>

      <div>
        <RBoldText text={"category: " + category} />
      </div>

      {/* <div>Published: {fmtDate(publishDate, ENGLISH, "short")}, {fmtTime(publishDate, ENGLISH)}</div> */}

      <div>Published: {fmtDate(publishDate, ENGLISH, "short")}</div>

      {blocks.map((block: ShortPostBlock, i: number) => <div key={"block-" + i}>
        <RShortPostBlock block={block} />
      </div>)}

      <Button onClick={() => {
        navigate("/edit-short-post", { state: { id } });
      }}>Edit Post</Button>



    </div>
  );
}

export function RShortPostBlock({ block }: { block: ShortPostBlock; }) {
  const { modifier, text, newPar } = block;
  let s;
  switch (modifier) {
    case "txt": s = <div>{text}</div>; break;
    case "b": s = <div>&#x2022; {text}</div>; break;
    case "vl": s = <Button href={text}>{text}</Button>; break;
    case "wl": s = <Button href={text}>{text}</Button>; break;
  }
  return (newPar ? <p>{s}</p> : <div>{s}</div>);
}

