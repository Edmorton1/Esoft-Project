import { useState } from "react"
import StoreMessages from "./Features/store/Store-Messages"
import MessageFeature from "./Features/MessageFeature"
import { observer } from "mobx-react-lite"

const MessageWidget = () => {
  const [editMessage, setEditMessage] = useState<null | number>(null)

  return <>
    {StoreMessages.messages?.sent?.map((msg, i) => (
      <MessageFeature key={i} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage} />
    ))}
    <div>Входящие</div>
    {StoreMessages.messages?.received?.map((msg, i) => (
      <MessageFeature key={i} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage}/>
    ))}
  </>
}

export default observer(MessageWidget)