import { useState } from "react"
import StoreMessages from "../../store/Store-Messages"
import MessageHead from "./modules/MessageHead"
import { observer } from "mobx-react-lite"

function MessageWidget() {
  // console.log("WIDGET RENDER")
  const [editMessage, setEditMessage] = useState<null | number>(null)

  return <>
    {StoreMessages.messages?.map(msg => (
      <MessageHead key={msg.id} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage}/>
    ))}
  </>
}

export default observer(MessageWidget)