// interface CommentInterface {
//   from: number,
//   to: number,
//   text: string
// }

import useGetById from "@/hooks/useGetById"
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
  const [files, setFiles] = useState<{new: FileList | null, old: string[]} | null>(null)

  const from = useGetById('forms', {id: msg.fromid}, 'single')
  const to = useGetById('forms', {id: msg.toid}, 'single')
  const datetime = `${new Date(msg.created_at!).toLocaleDateString()} ${new Date(msg.created_at!).toLocaleTimeString()}`

  useEffect(() => {
    if (editing) {
      setValue(msg.text)
      setFiles({new: null, old: msg.files})
    }
  }, [editing])

  function DeletedFiles() {
    return files?.old.map(e => (
      <>
        {e}
        <button onClick={() => setFiles(prev => ({...prev!, old: prev!.old.filter(file => file != e)}))}>удалить</button>
      </>
    ))
  }
  
  return (
    <>
      <div>От {from?.name} К {to?.name} {datetime}</div>
      <br />
      <div>Текст:
        {editing 
        ? <>
            <input type="text" onChange={e => setValue(e.target.value)} defaultValue={value} />
            <br />
            <div>
            <DeletedFiles />
            </div>
            <br />
            <div onClick={() => console.log(files)}>Добавить</div>
            <input onChange={e => {
              setFiles(prev => ({...prev!, new: e.target.files}))
            }} type="file" multiple />
            <button onClick={() => {StoreMessages.put({...msg, text: value, files: files!}); setEditMessage(null)}}>Готово</button>
          </>
        : <span>{msg.text}</span>}
      </div>
      <br />
      {msg.fromid === StoreForm.form?.id && !editing && (
        <>
          {/* <img src={msg.files[0]} alt="" /> */}
          <button onClick={() => setEditMessage(msg.id!)}>Изменить</button>
          <button onClick={() => StoreMessages.delete(msg.id!)}>Удалить</button>
          <button onClick={() => console.log(toJS(StoreMessages.messages))}>Вывести сообщения</button>
        </>
      )}
    </>
  )
}

export default MessageComponent