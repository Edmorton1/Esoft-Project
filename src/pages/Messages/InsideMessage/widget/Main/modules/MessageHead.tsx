import { Message } from "@t/gen/Users"
import { createContext, memo, useCallback, useEffect, useState } from "react"
import MessageBody from "./MessageBody"
import StoreMessages from "../../../../store/Store-Messages"
import { MessageFiles } from "@t/client/DTOClient"

// files, value, inputNewFile, textInput, submitClick, clickDeleteFile

interface propsInterface {
  msg: Message,
  editing: boolean,
  setEditMessage: React.Dispatch<React.SetStateAction<number | null>>
}

interface contextInterface {
  value: string,
  files: MessageFiles | null,
  clickDeleteFile: (item: string) => any,
  inputNewFile: (e: React.ChangeEvent<HTMLInputElement>) => any,
  textInput: (e: React.ChangeEvent<HTMLInputElement>) => any,
  submitClick: () => any,
  deleteClick: () => void,
}

export const MessageContext = createContext<contextInterface | null>(null)

function MessageHead({msg, editing, setEditMessage}: propsInterface) {
  // console.log("MODULE RENDER", msg.id)
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<{new: FileList | null, old: string[]} | null>(null)

  useEffect(() => {
    if (editing) {
      setValue(msg.text)
      setFiles({new: null, old: Array.isArray(msg?.files) ? msg.files : []})
    }
  }, [editing, msg.files, msg.text])

  const changeClick = useCallback(() => setEditMessage(editing ? null : msg.id!), [msg.id, setEditMessage, editing])
  const deleteClick = useCallback(() => StoreMessages.delete(msg.id!), [msg])

  // const submitClick = useCallback(() => {StoreMessages.put({...msg, text: value, files: files!}); setEditMessage(null)}, [msg, value, files, setEditMessage])
  
  const total = {...msg, text: value, files: files!, deleted: []}
  const submitClick = useCallback(() => {StoreMessages.put(total); setEditMessage(null)}, [msg, value, files, setEditMessage])

  const inputNewFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFiles(prev => ({...prev!, new: e.target.files})), [])
  const textInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), [])
  const clickDeleteFile = useCallback((item: string) => setFiles(prev => ({...prev!, old: prev!.old!.filter(file => file != item)})), [])

  const context = {
    value,
    files,
    inputNewFile,
    textInput,
    submitClick,
    clickDeleteFile,
    deleteClick
  }
  
  return <MessageContext.Provider value={context}>
    <MessageBody 
      editing={editing}
      msg={msg}
      changeClick={changeClick}
    />
  </MessageContext.Provider>
}

export default memo(MessageHead)