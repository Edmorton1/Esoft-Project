import { useState } from "react"
import StoreMessages from "./modules/store/Store-Messages"
import MessageModule from "./modules/MessageModule"
import { observer } from "mobx-react-lite"

const MessageWidget = () => {
  const [editMessage, setEditMessage] = useState<null | number>(null)

  return <>
    {StoreMessages.messages?.sent?.map((msg, i) => (
      <MessageModule key={i} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage} />
    ))}
    <div>Входящие</div>
    {StoreMessages.messages?.received?.map((msg, i) => (
      <MessageModule key={i} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage}/>
    ))}
  </>
}

export default observer(MessageWidget)