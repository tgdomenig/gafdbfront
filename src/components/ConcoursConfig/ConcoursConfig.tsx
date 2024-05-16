import { List, Select, Typography } from "antd";
import { PageTitle } from "../Base/Base";
import { useContext, useState } from "react";
import { CheckOutlined, LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { ConfirmAndSubmit } from "../Base/ConfirmAndSubmit";
import { Context } from "../../util/dbFront/Context";

const CONCOURS_CONFIG_DISPLAY_NAME = "Gaf App Config Concours"; // nicht ändern (gleicher Name wie in App)

export function ConcoursConfig() {

  const [currentConfiguration, setCurrentConfiguration] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const options = Object.keys(Configurations).map(key => ({label: key, value: key}));

  return(
    <div>
      <PageTitle title="Konfiguration des Concours-Screens" />

      <Select
        style={{width: 400}}
        onChange={(key) => {
          // @ts-ignore
          setCurrentConfiguration(Configurations[key])
        }}
        options={options}
      />

      {currentConfiguration
        ? <RenderConfiguration truthys={currentConfiguration} />
        : <div />
      }
      <ConfirmAndSubmit 
        data={currentConfiguration}
        isModalOpen={isModalOpen}
//        onCancel={() => setIsModalOpen(false)}
        onSubmit={(configuration: string[]) => {}}
        setIsModalOpen={setIsModalOpen}
        renderData={(configuration: string[]) => <RenderConfiguration truthys={configuration} />}
      />
    </div>
  )
}

function RenderConfiguration({truthys}: {truthys: string[]}) {
  return(
    <List
        header={<div>Ausgewählte Konfiguration:</div>}
        bordered
        dataSource={truthys.map(key => displayNames.get(key)).reverse()}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text ><RightOutlined /></Typography.Text> {item}
          </List.Item>
        )}
      />
  )

}

const Configurations = {
    "Basis": [
      "Candidates", "Jury", "Schedule", "Prizes"
    ],
    "Zeige Kurznachrichten": [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts"
    ],
    "Concours beginnt": [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream"
    ],
    "Zeige Performance Browser": [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser"
    ],
    "Zeige Runde 2": [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo"
    ],
    "Zeige Runde 3": [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo", "RoundThree"
    ],
    "Zeige Runde 4": [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo", "RoundThree", "RoundFour"
    ],
    "Zeige Voting-Seite": [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo", "RoundThree", "RoundFour", "VotingScreen"
    ],
    "Zeige Preisträger": [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo", "RoundThree", "RoundFour", "PrizeWinner"
    ]
}


const ConfigurationsDEP = [
  {
    label: "Basis",
    truthys: [
      "Candidates", "Jury", "Schedule", "Prizes"
    ]
  },
  {
    label: "Zeige Kurznachrichten",
    truthys: [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts"
    ]
  },
  {
    label: "Concours beginnt",
    truthys: [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream"
    ]
  },
  {
    label: "Zeige Performance Browser",
    truthys: [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser"
    ]
  },
  {
    label: "Zeige Runde 2",
    truthys: [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo"
    ]
  },
  {
    label: "Zeige Runde 3",
    truthys: [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo", "RoundThree"
    ]
  },
  {
    label: "Zeige Runde 4",
    truthys: [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo", "RoundThree", "RoundFour"
    ]
  },
  {
    label: "Zeige Voting-Seite",
    truthys: [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo", "RoundThree", "RoundFour", "VotingScreen"
    ]
  },
  {
    label: "Zeige Preisträger",
    truthys: [
      "Candidates", "Jury", "Schedule", "Prizes", "ShortPosts", "RoundOne", "LiveStream", "PerformancesBrowser", 
      "RoundTwo", "RoundThree", "RoundFour", "PrizeWinner"
    ]
  }
]

const CONFIG_STATIC_PART = {
  "LiveVideoLink": {
    "platform": "Youtube",
    "videoId": "AcmVUY1ZNDM",
    "startTime": 0
  },
  "JuryPresident": "Gulda, Rico",
  "CurrentRound": "",
  "CurrentSession": ""
}

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

/*

Basics:
    "Candidates": true,
    "Jury": true,
    "Schedule": true,
    "Prizes": true,

Concours Started:
    "ShortPosts": true,
    "RoundOne": true,
    "LiveStream": true,

Concours: after day 1:
    "PerformancesBrowser": true,

Concours: after round 1:
    "RoundTwo": true,

Concours: after round 2:
    "RoundThree": true,

Concours: after round 3:
    "RoundFour": true,

Concours: after round 4 / A:
    "VotingScreen": true,

Concours: after round 4 / B:
    "PrizeWinner": true





  "displayId": "Gaf App Config Concours",
  "Show": {
    "Candidates": true,
    "Jury": true,
    "Schedule": true,
    "Prizes": true,
    "ShortPosts": true,
    "RoundOne": false,
    "RoundTwo": false,
    "RoundThree": false,
    "RoundFour": false,
    "LiveStream": false,
    "VotingScreen": false,
    "PerformancesBrowser": false,
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

*/