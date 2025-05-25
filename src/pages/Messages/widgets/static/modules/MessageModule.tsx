import { Message } from "@t/gen/Users"
import { memo, useCallback, useEffect, useState } from "react"
import MessageComponent from "./components/MessageComponent"
import StoreMessages from "../../store/Store-Messages"

interface propsInterface {
  msg: Message,
  editing: boolean,
  setEditMessage: React.Dispatch<React.SetStateAction<number | null>>
}

const MessageModule = ({msg, editing, setEditMessage}: propsInterface) => {
  // console.log("MODULE RENDER", msg.id)
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<{new: FileList | null, old: string[] | null} | null>(null)

  useEffect(() => {
    if (editing) {
      setValue(msg.text)
      setFiles({new: null, old: Array.isArray(msg?.files) && msg.files.length > 0 ? msg.files : null})
    }
  }, [editing, msg.files, msg.text])

  const changeClick = useCallback(() => setEditMessage(msg.id!), [msg.id, setEditMessage])
  const deleteClick = useCallback(() => StoreMessages.delete(msg.id!), [msg])

  const submitClick = useCallback(() => {StoreMessages.put({...msg, text: value, files: files!}); setEditMessage(null)}, [msg, value, files, setEditMessage])
  const inputNewFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFiles(prev => ({...prev!, new: e.target.files})), [])
  const textInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), [])
  const clickDeleteFile = useCallback((item: string) => setFiles(prev => ({...prev!, old: prev!.old!.filter(file => file != item)})), [])


  
  return <MessageComponent 
    editing={editing}
    msg={msg}
    changeClick={changeClick}
    deleteClick={deleteClick}
    value={value}
    files={files}
    submitClick={submitClick}
    inputNewFile={inputNewFile}
    textInput={textInput}
    clickDeleteFile={clickDeleteFile}
  />
}

export default memo(MessageModule)