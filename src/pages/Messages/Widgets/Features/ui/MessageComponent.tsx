import useGetById from "@/hooks/useGetById"
import StoreForm from "@/store/Store-Form"
import { Message } from "@s/core/domain/Users"
import MessageEdit from "./shared/MessageEdit"

interface propsInterface {
  editing: boolean,
  msg: Message,
  changeClick: () => void,
  deleteClick: () => void
}

function MessageComponent({editing, msg, changeClick, deleteClick}: propsInterface) {

  const to = useGetById('forms', {id: msg.toid}, 'single')
  const datetime = `${new Date(msg.created_at!).toLocaleDateString()} ${new Date(msg.created_at!).toLocaleTimeString()}`
  
  return <>
    <div>От {msg.fromid} К {to?.name} {datetime}</div>
    <br />
    <div>
      <p>Текст: {msg.text}</p>
      {editing && <MessageEdit/>}
    </div>
    <br />
    {msg.fromid === StoreForm.form?.id && <>
      <button onClick={changeClick}>Изменить</button>
      <button onClick={deleteClick}>Удалить</button>
    </>}
  </>
}

export default MessageComponent