import { Message } from "@s/core/domain/Users"
import { useEffect, useState } from "react"
import MessageComponent from "./components/MessageComponent"
import StoreMessages from "./store/Store-Messages"

interface propsInterface {
  msg: Message,
  editing: boolean,
  setEditMessage: React.Dispatch<React.SetStateAction<number | null>>
}

function MessageModule({msg, editing, setEditMessage}: propsInterface) {
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<{new: FileList | null, old: string[] | null} | null>(null)

  useEffect(() => {
    if (editing) {
      setValue(msg.text)
      setFiles({new: null, old: Array.isArray(msg?.files) && msg.files.length > 0 ? msg.files : null})
    }
  }, [editing])

  const changeClick = () => setEditMessage(msg.id!)
  const deleteClick = () => StoreMessages.delete(msg.id!)

  const submitClick = () => {StoreMessages.put({...msg, text: value, files: files!}); setEditMessage(null)};
  const inputNewFile = (e: React.ChangeEvent<HTMLInputElement>) => setFiles(prev => ({...prev!, new: e.target.files}));
  const textInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const clickDeleteFile = (item: string) => setFiles(prev => ({...prev!, old: prev!.old!.filter(file => file != item)}));


  
  return <MessageComponent editing={editing} msg={msg} changeClick={changeClick} deleteClick={deleteClick} value={value} files={files} submitClick={submitClick} inputNewFile={inputNewFile} textInput={textInput} clickDeleteFile={clickDeleteFile}/>
}

export default MessageModule