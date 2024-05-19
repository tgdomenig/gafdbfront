import { Checkbox, List, Select, Typography } from "antd";
import { PageTitle, RVSpace, SubTitle } from "../Base/Base";
import { useContext, useEffect, useState } from "react";
import { CheckOutlined, LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit";
import { Context } from "../../util/dbFront/Context";
import { EditVideoLink } from "../Competition/EditVideoLink";
import { fGetConfigItem } from "../../data/Datastore/ModelsCommon/ConfigItem/ConfigItemR";
import { ConcoursConfig } from "./Types";
import { EVideoLink } from "../Competition/Types";
import { RVideoLink } from "../BasicRendering/RenderPerformance";
import { updateConfigItem } from "../../data/Datastore/ModelsWeb/ConfigItem/ConfigItemCUD";

const CONCOURS_CONFIG_DISPLAY_ID = "Gaf App Config Concours"; // nicht ändern (gleicher Name wie in App)

type CfgInit = {
  chosenComponents: string[],
  videoId: string,
  startTimeInSeconds: number
}

export function EditConcoursConfig() {

  const [chosenComponents, setChosenComponents] = useState<string[]>([]);
  const [videoId, setVideoId] = useState("");
  const [startTimeInSeconds, setStartTimeInSecions] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    const load = async () => {
      const cfg = await fGetConfigItem(CONCOURS_CONFIG_DISPLAY_ID);
      if (cfg) {
        const {data} = cfg;
        if (data) {
          const concoursCfg = JSON.parse(data) as ConcoursConfig;
          const {LiveVideoLink} = concoursCfg;
          setVideoId(LiveVideoLink.videoId || "");
          setStartTimeInSecions(LiveVideoLink.startTimeInSeconds || 0);
          // @ts-ignore
          setChosenComponents(AllComponents.filter(c => concoursCfg.Show[c]))
        }
      }
    }
    load();
  }, [triggerReload])
  
  return(
    <div>
      <PageTitle title="Konfiguration des Concours-Screens" />

      <SubTitle title="Switch on/off" />
      <Checkbox.Group
        value={chosenComponents}
        options={AllComponents.map(comp => ({label: displayNames.get(comp), value: comp}))}
        onChange={(values: string[]) => { setChosenComponents(values); }}
        style={{ display: 'flex', flexDirection: 'column' }}
      />

      <RVSpace />
      <SubTitle title="Livestream" />
      <EditVideoLink 
        videoLink={{videoId, startTimeInSeconds}}
        onChangeVideoId={(value: string) => { setVideoId(value); }}
        onChangeStartTime={(value: number) => { setStartTimeInSecions(value); }}
      />

      {/* <RenderConfiguration truthys={chosenComponents} /> */}

      <ConfirmAndSubmit<CfgInit>
        data={{chosenComponents, videoId, startTimeInSeconds}}
        isModalOpen={isModalOpen}
//        onCancel={() => setIsModalOpen(false)}
        onSubmit={async (cfgInit: CfgInit) => {
          const cfgItem = makeConcoursConfigItem(cfgInit);
          await updateConfigItem({
            displayId: CONCOURS_CONFIG_DISPLAY_ID,
            data: JSON.stringify(cfgItem)
          });
          setTriggerReload(! triggerReload);
        }}
        setIsModalOpen={setIsModalOpen}
        renderData={(cfgInit: CfgInit) => <RenderConfiguration cfgInit={cfgInit} />}
      />
    </div>
  )
}

function RenderConfiguration({cfgInit}: {cfgInit: CfgInit}) {
  const {chosenComponents, videoId, startTimeInSeconds} = cfgInit;
  return(
    <div>
      <List
        header={<div>Ausgewählte Konfiguration:</div>}
        bordered
        dataSource={chosenComponents.map(key => displayNames.get(key))}
        renderItem={(item) => (
          <List.Item style={{paddingTop: 6, paddingBottom: 6}}>
            <Typography.Text ><RightOutlined /></Typography.Text> {item}
          </List.Item>
        )}
      />
      <RVSpace />
      <RVideoLink videoLink={{videoId,startTimeInSeconds}} />
    </div>
  )
}

const AllComponents = [
      "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo", "RoundThree", "RoundFour", "VotingScreen", "PrizeWinner"
]

const displayNames = new Map<string, string>([
  ["Candidates", "Kandidaten"],
  ["Jury", "Jury"],
  ["Schedule", "Zeitplan"],
  ["Prizes", "Preise"],
  ["ShortPosts", "Concours Kurznachrichten"],
  ["RoundOne", "Runde 1"],
  ["LiveStream", "Live Stream"],
  ["PerformancesBrowser", "Performance Browser"], 
  ["RoundTwo", "Runde 2"],
  ["RoundThree", "Runde 3"],
  ["RoundFour", "Runde 4"],
  ["VotingScreen", "Voting-Seite"], 
  ["PrizeWinner", "Preisträger"]
])

const makeConcoursConfigItem = (cfgInit: CfgInit) => {
  const show = {
    "Candidates": true,
    "Jury": true,
    "Schedule": true,
    "Prizes": true,
    "ShortPosts": false,
    "RoundOne": false,
    "RoundTwo": false,
    "RoundThree": false,
    "RoundFour": false,
    "LiveStream": false,
    "VotingScreen": false,
    "PerformancesBrowser": false,
    "PrizeWinner": false
  };
  for (var value of cfgInit.chosenComponents) {
    // @ts-ignore
    show[value] = true;
  }
  return({
    "displayId": "Gaf App Config Concours",
    "Show": show,
    "LiveVideoLink": {
      "platform": "Youtube",
      "videoId": cfgInit.videoId,
      "startTimeInSeconds": cfgInit.startTimeInSeconds
    },
    "JuryPresident": "Gulda, Rico",
    "CurrentRound": "",
    "CurrentSession": ""
  })

}



/*

[{
  "displayId": "Gaf App Config Concours",
  "Show": {
    "Candidates": true,
    "Jury": true,
    "Schedule": true,
    "Prizes": true,
    "ShortPosts": true,
    "RoundOne": true,
    "RoundTwo": true,
    "RoundThree": true,
    "RoundFour": false,
    "LiveStream": true,
    "VotingScreen": false,
    "PerformancesBrowser": true,
    "PrizeWinner": false
  },
  "LiveVideoLink": {
    "platform": "Youtube",
    "videoId": "AcmVUY1ZNDM",
    "startTime": 0
  },
  "JuryPresident": "Gulda, Rico",
  "CurrentRound": "",
  "CurrentSession": ""
}]


*/