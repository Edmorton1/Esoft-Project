import { Message } from "@s/core/domain/Users"
import { useEffect, useState } from "react"
import { createContext } from "react"
import MessageComponent from "./ui/MessageComponent"
import StoreMessages from "./store/Store-Messages"
import { MessageContextType } from "./types/MessageTypes"

interface propsInterface {
  msg: Message,
  editing: boolean,
  setEditMessage: React.Dispatch<React.SetStateAction<number | null>>
}

export const MessageContext = createContext<MessageContextType | null>(null)

function MessageFeature({msg, editing, setEditMessage}: propsInterface) {
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<{new: FileList | null, old: string[] | null} | null>(null)

  useEffect(() => {
    if (editing) {
      setValue(msg.text)
      setFiles({new: null, old: Array.isArray(msg?.files) && msg.files.length > 0 ? msg.files : null})
    }
  }, [editing])

  const context = {
    value: value,
    files: files,

    submitClick: () => {StoreMessages.put({...msg, text: value, files: files!}); setEditMessage(null)},
    inputNewFile: (e: React.ChangeEvent<HTMLInputElement>) => setFiles(prev => ({...prev!, new: e.target.files})),
    textInput: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    clickDeleteFile: (item: string) => setFiles(prev => ({...prev!, old: prev!.old!.filter(file => file != item)})),
  }

  const changeClick = () => setEditMessage(msg.id!)
  const deleteClick = () => StoreMessages.delete(msg.id!)


  
  return (
    <MessageContext.Provider value={context}>
      <MessageComponent editing={editing} msg={msg} changeClick={changeClick} deleteClick={deleteClick}/>
    </MessageContext.Provider>
  )
}

export default MessageFeature