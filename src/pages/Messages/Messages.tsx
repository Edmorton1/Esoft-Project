import StoreMessages from "@/pages/Messages/Widgets/Features/store/Store-Messages"
import { Message } from "@s/core/domain/Users"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import StoreForm from "@/store/Store-Form"
import MessageWidget from "@/pages/Messages/Widgets/MessageWidget"
import { MessageDTO } from "@s/core/dtoObjects"

function Messages() {
  const [editMessage, setEditMessage] = useState<null | number>(null)

  const {register, handleSubmit} = useForm<MessageDTO>()
  
  return (
    <>
      <div>Пользователь: {StoreForm.form?.name}</div>
      <div>Сообщения</div>
      <div>Исходящие</div>
      {StoreMessages.messages?.sent?.map((msg, i) => (
        <MessageWidget key={i} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage} />
      ))}
      <div>Входящие</div>
      {StoreMessages.messages?.received?.map((msg, i) => (
        <MessageWidget key={i} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage}/>
      ))}
      <br />
      <form onSubmit={handleSubmit((data: MessageDTO) => StoreMessages.send(data))} style={{display: "flex", flexDirection: "column", width: "300px"}}>
        <div>Отправить сообщение</div>
        <input {...register('fromid', {valueAsNumber: true})} type="number" placeholder="От кого?" />
        <input {...register('toid', {valueAsNumber: true})} type="number" placeholder="К кому?" />
        <label htmlFor="text">Текст</label>
        <input {...register('text')} type="text" defaultValue={"text test"} id="text" />
        <label htmlFor="files">Файлы</label>
        <input {...register("files")} type="file" multiple id="files" />
        <button>Отпраивть</button>
      </form>
    </>
  )
}

export default observer(Messages)