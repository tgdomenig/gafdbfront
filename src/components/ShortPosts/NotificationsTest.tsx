//import { fmtDate, fmtTime } from "../../util/common/dateTime/Localized";
// import { ENGLISH } from "../../util/common/language/Const";
import { Button } from "antd";
import { ShortPost } from "../../data/Datastore/ModelsCommon/ShortPost/ShortPostTypes";

export function NotificationsTest({ post }: { post: ShortPost; }) {

  const sendNotifications = async () => {
    const url = "https://t8gqqummsj.execute-api.eu-central-1.amazonaws.com/dev";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  }

  return (
    <div >

      <Button onClick={sendNotifications} >Invoke API</Button>

    </div>
  );
}
