// interface CommentInterface {
//   from: number,
//   to: number,
//   text: string
// }

import useGetForm from "@/assets/useGetForm"
import StoreForm from "@/store/Store-Form"
import StoreMessages from "@/store/Store-Messages"
import { Message } from "@s/core/domain/Users"
import { useEffect, useState } from "react"

interface propsInterface {
  msg: Message,
  editing: boolean,
  setEditMessage: React.Dispatch<React.SetStateAction<number>>
}

function MessageComponent({msg, editing, setEditMessage}: propsInterface) {
  const [value, setValue] = useState('')

  const from = useGetForm(msg.fromid)
  const to = useGetForm(msg.toid)

  return (
    <>
      <div>От {from?.name} К {to?.name}</div>
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
      {msg.fromid == StoreForm.form.id && !editing && (
        <>
          <button onClick={() => setEditMessage(msg.id)}>Изменить</button>
          <button onClick={() => StoreMessages.delete(msg.id)}>Удалить</button>
        </>
      )}
    </>
  )
}

export default MessageComponent