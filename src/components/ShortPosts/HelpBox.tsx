import { Collapse, Descriptions } from "antd";
import { SubSubTitle } from "../Base/Base";

export function HelpBox() {

  return (

    <Collapse
      style={{marginBottom: 20}}
      collapsible="header"
      //      defaultActiveKey={['1']}
      items={[
        {
          key: '1',
          label: 'Help: Body Syntax and Modifiers',
          children: <div>
            <div style={{ marginBottom: 10 }}>The body of the message can be structured with the help of the following directives.</div>

            <Descriptions
              column={1}
              size="small"
              bordered={true}
            >
              <Descriptions.Item label="Normal Text">Just Text, no HTML</Descriptions.Item>
              <Descriptions.Item label="New Paragraph">Two newlines, i.e. leave one line blank</Descriptions.Item>
              <Descriptions.Item label="Bullet"><strong>b:</strong> Some Text</Descriptions.Item>
              <Descriptions.Item label="Video Link"><strong>vl:</strong> {`{videoId: someYoutubeId, start: startTimeInSeconds}`}</Descriptions.Item>
              <Descriptions.Item label="Web Link"><strong>wl:</strong> {`{label: buttonLabel, url: URL}`}</Descriptions.Item>
            </Descriptions>

            <SubSubTitle title="Example" />
            
            <Descriptions
              column={1}
              size="small"
              bordered={true}
            >
              <Descriptions.Item label="Example"><pre>{EXAMPLE}</pre></Descriptions.Item>
            </Descriptions>

          </div>
        },
      ]} />
  );
}

const EXAMPLE = `This is the first paragraph of our example.

Here comes the second paragraph. It includes some bullets:
b: namely this one
b: and a second one.

The next paragraph then includes a video link:
vl: {videoId: PvP_V_MJ_Ew, start: 50}
and a Web link:
wl: {label: go to website, url: https://geza-anda.ch/}

This fourth paragraph concludes our example.
`
const EXAMPLE_JSON = [
  {"modifier":"txt","newPar":true,"text":"This is the first paragraph of our example."},
  {"modifier":"txt","newPar":true,"text":"Here comes the second paragraph. It includes some bullets:"},
  {"modifier":"b","newPar":false,"text":"namely this one"},
  {"modifier":"b","newPar":false,"text":"nd a second one."},
  {"modifier":"txt","newPar":true,"text":"The next paragraph then includes a video link:"},
  {"modifier":"vl","newPar":false,"text":"https://youtu.be/8z5HkP_N8WY"},
  {"modifier":"txt","newPar":false,"text":"and a Web link:"},
  {"modifier":"txt","newPar":false,"text":"https://geza-anda.ch/"},
  {"modifier":"txt","newPar":true,"text":"This fourth paragraph concludes our example."}
]