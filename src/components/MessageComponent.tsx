// interface CommentInterface {
//   from: number,
//   to: number,
//   text: string
// }

import useGetById from "@/assets/useGetById"
import StoreForm from "@/store/Store-Form"
import StoreMessages from "@/store/Store-Messages"
import { Message } from "@s/core/domain/Users"
import { toJS } from "mobx"
import { useEffect, useState } from "react"

interface propsInterface {
  msg: Message,
  editing: boolean,
  setEditMessage: React.Dispatch<React.SetStateAction<number | null>>
}

function MessageComponent({msg, editing, setEditMessage}: propsInterface) {
  const [value, setValue] = useState('')

  const from = useGetById('forms', {id: msg.fromid}, 'single')
  const to = useGetById('forms', {id: msg.toid}, 'single')
  const datetime = `${new Date(msg.created_at!).toLocaleDateString()} ${new Date(msg.created_at!).toLocaleTimeString()}`
  
  return (
    <>
      <div>От {from?.name} К {to?.name} {datetime}</div>
      <br />
      <div>Текст:
        {editing 
        ? <>
            <input type="text" onChange={e => setValue(e.target.value)} />
            <button onClick={() => {StoreMessages.put({...msg, text: value}); setEditMessage(null)}}>Готово</button>
          </>
        : <span>{msg.text}</span>}
      </div>
      <br />
      {msg.fromid === StoreForm.form?.id && !editing && (
        <>
          <button onClick={() => setEditMessage(msg.id!)}>Изменить</button>
          <button onClick={() => StoreMessages.delete(msg.id!)}>Удалить</button>
          <button onClick={() => console.log(toJS(StoreMessages.messages))}>Вывести сообщения</button>
        </>
      )}
    </>
  )
}

export default MessageComponent