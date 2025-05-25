import { useState } from "react"
import StoreMessages from "../store/Store-Messages"
import MessageModule from "./modules/MessageModule"
import { observer } from "mobx-react-lite"

const MessageWidget = () => {
  // console.log("WIDGET RENDER")
  const [editMessage, setEditMessage] = useState<null | number>(null)

  return <>
    {StoreMessages.messages?.sent?.map(msg => (
      <MessageModule key={msg.id} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage} />
    ))}
    <div>Входящие</div>
    {StoreMessages.messages?.received?.map(msg => (
      <MessageModule key={msg.id} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage}/>
    ))}
  </>
}

export default observer(MessageWidget)