import { useEffect, useState } from "react";
import { DsGenericItem } from "../../models";
//import { ENGLISH } from "../../util/common/language/Const";
import { PageTitle } from "../Base/Base";
import { ShortPost } from "../../data/Datastore/ModelsCommon/Generic/ShortPostTypes";
import { xGetStagedList } from "../../data/Datastore/ModelsCommon/Base/xGetStaged";
import { stageShortPost } from "../../data/Datastore/ModelsCommon/Generic/ShortPosts";
import { RShortPost } from "./RShortPost";
import { getDSShortPosts } from "../../data/Datastore/ModelsCommon/Generic/GenericR";
import { ENGLISH } from "../../util/common/language";

export function ShortPostsHistory() {

  const [data, setData] = useState<ShortPost[]>([]);

  useEffect(() => {
      const load = async () => {
        const newData = await xGetStagedList<DsGenericItem, ShortPost>(ENGLISH, getDSShortPosts, stageShortPost);
        if (newData) { setData(newData); }
      }
      load();
    },
  []);

  return(
      <div>
        <PageTitle title="Short Posts Currently in DB" />

        <div>
          {data.map((post: ShortPost) => {
            return <RShortPost post={post} />
          })}
        </div>
      </div>
  );
}

/*
EXAMPLES
--------

Interview with Giorgi Gigashvili

Giorgi is the Hortense Anda prize winner of the Concours 2021. See how he performed at the Géza Anda Piano Night on November 18, 2022:
vl: https://youtu.be.com/OETOZHhxqv8

Giorgi will be present at this year's concours opening.
*/


const SamplePosts = [
  {
    displayId: "2024-03-05T14:48:00.000Z / First Short Post",
    text: JSON.stringify({
        "title": "First Short Post",
        "publishDate": "2024-03-05T14:48:00.000Z",
        "blocks": [
          {
            "modifier": "text",
            "text": "This is the text"
          },
          {
            "modifier": "vl",
            "text": "video link"
          },
          {
            "modifier": "b",
            "text": "bullet"
          },
          {
            "modifier": "wl",
            "text": "web link"
          }
        ],
        "expiry": "2024-03-07T22:59:00.000Z"
      }),
    },
    {
      displayId: "2024-03-04T16:38:00.000Z / Second Short Post",
      text: JSON.stringify({
        "title": "Second Short Post",
        "publishDate": "2024-03-04T16:38:00.000Z",

        "blocks": [
          {
            "modifier": "text",
            "text": "Again some text"
          },
          {
            "modifier": "wl",
            "text": "web link"
          },
          {
            "modifier": "b",
            "text": "and another bullet"
          },
          {
            "modifier": "text",
            "text": "more text this time"
          }
        ],
        "expiry": "2024-05-04T10:00"
      })
    }
]