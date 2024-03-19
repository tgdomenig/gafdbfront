import { Collapse, Descriptions } from "antd";
import { SubSubTitle } from "../Base/Base";

export function HelpBox() {

  return (

    <Collapse
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
              <Descriptions.Item label="Video Link"><strong>vl:</strong> https://youtu.be/8z5HkP_N8WY</Descriptions.Item>
              <Descriptions.Item label="Web Link"><strong>wl:</strong> https://geza-anda.ch/</Descriptions.Item>
            </Descriptions>

            <SubSubTitle title="Example" />
            
            <Descriptions
              column={1}
              size="small"
              bordered={true}
            >
              <Descriptions.Item label="Example"><pre>{EXAMPLE}</pre></Descriptions.Item>
            </Descriptions>

            <SubSubTitle title="JSON format" />
            
            <div>Internally, the text is stored in a JSON format using the following modifiers:
              <ul>
                <li>"txt": normal text</li>
                <li>"b": bullet</li>
                <li>"vl": video link</li>
                <li>"wl": web link</li>
              </ul>
              In addition, the variable newPar indicates whether the fragment represents the beginning of a new paragraph.
            </div>

            <div>In the above example, this yields the following JSON object:</div>
            <pre>{JSON.stringify(EXAMPLE_JSON, undefined, 2)}</pre>

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
vl: https://youtu.be/8z5HkP_N8WY
and a Web link:
wl: https://geza-anda.ch/

This fourth paragraph concludes our example.
`
const EXAMPLE_JSON = [
  {"modifier":"txt","newPar":true,"text":"This is the first paragraph of our example."},
  {"modifier":"txt","newPar":true,"text":"Here comes the second paragraph. It includes some bullets:"},
  {"modifier":"b","newPar":false,"text":"b: namely this one"},
  {"modifier":"b","newPar":false,"text":"b: and a second one."},
  {"modifier":"txt","newPar":true,"text":"The next paragraph then includes a video link:"},
  {"modifier":"vl","newPar":false,"text":"vl: https://youtu.be/8z5HkP_N8WY"},
  {"modifier":"txt","newPar":false,"text":"and a Web link:"},
  {"modifier":"txt","newPar":false,"text":"wl: https://geza-anda.ch/"},
  {"modifier":"txt","newPar":true,"text":"This fourth paragraph concludes our example."}
]