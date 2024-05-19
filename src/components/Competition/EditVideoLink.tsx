import { Input, InputNumber } from "antd";
import { VideoLink } from "../../models";
import { EVideoLink } from "./Types";

export function stageVideoLink(vl?: VideoLink): { videoId: string; startTimeInSeconds: number; } {
  const videoId = (vl && vl.videoId) ? vl.videoId : "";
  const startTimeInSeconds = (vl && vl.startTimeInSeconds) ? vl.startTimeInSeconds : 0;
  return { videoId, startTimeInSeconds };
}

export function EditVideoLink({ videoLink, onChangeVideoId, onChangeStartTime }: {
  videoLink: EVideoLink
  onChangeVideoId: (value: string) => void
  onChangeStartTime: (value: number) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: "row" }}>
      <Input
        addonBefore="Youtube video id:"
        placeholder="Youtube VideoId"
        value={videoLink.videoId}
        style={{ width: 400 }}
        onChange={(e) => onChangeVideoId(e.target.value)} />
      <InputNumber
        addonBefore="start time (seconds):"
        placeholder="start time in seconds"
        value={videoLink.startTimeInSeconds}
        style={{ height: 32 }}
        onChange={(value: number | null) => onChangeStartTime(value || 0)} />
    </div>
  )
}

