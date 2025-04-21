import StoreMessages from "@/store/Store-Messages"
import { Message } from "@s/core/domain/Users"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import StoreForm from "@/store/Store-Form"
import MessageComponent from "@/components/MessageComponent"

function Messages() {
  const [editMessage, setEditMessage] = useState<null | number>(null)

  useEffect(() => {
    StoreMessages.initial()
  }, [])

  const {register, handleSubmit} = useForm<Message>()
  
  return (
    <>
      <div>Пользователь: {StoreForm.form?.name}</div>
      <div>Сообщения</div>
      <div>Исходящие</div>
      {StoreMessages.messages?.sent?.map(msg => (
        <MessageComponent msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage} />
      ))}
      <div>Входящие</div>
      {StoreMessages.messages?.received?.map(msg => (
        <MessageComponent msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage}/>
      ))}
      <br />
      <form onSubmit={handleSubmit((data: Message) => StoreMessages.send(data))}>
        <div>Отправить сообщение</div>
        <input {...register('fromid', {valueAsNumber: true})} type="number" placeholder="От кого?" />
        <input {...register('toid', {valueAsNumber: true})} type="number" placeholder="К кому?" />
        <label>Текст</label>
        <input {...register('text')} type="text" value={"text test"} />
        <button>Отпраивть</button>
      </form>
    </>
  )
}

export default observer(Messages)