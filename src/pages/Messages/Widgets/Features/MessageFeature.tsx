import useGetById from "@/hooks/useGetById"
import StoreForm from "@/store/Store-Form"
import { Message } from "@s/core/domain/Users"
import MessageStatic from "./ui/MessageStatic"
import MessageEdit from "./ui/MessageEdit"

interface propsInterface {
  msg: Message,
  changeClick: () => any,
  deleteClick: () => any,
  editing: boolean
}

function MessageFeature({msg, changeClick, deleteClick, editing}: propsInterface) {
  const to = useGetById('forms', {id: msg.toid}, 'single')
  const datetime = `${new Date(msg.created_at!).toLocaleDateString()} ${new Date(msg.created_at!).toLocaleTimeString()}`
  
  return <>
    <div>От {msg.fromid} К {to?.name} {datetime}</div>
    <br />
    <div>
      <p>Текст:</p>
      {editing && <MessageEdit/>}
    </div>
    <br />
    {msg.fromid === StoreForm.form?.id && <MessageStatic/>}
  </>
}

export default MessageFeature