import storeAuthorization from "@/store/Store-User"
import StoreMessages from "@/store/Store-Messages"
import { Message } from "@s/core/domain/Users"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

function Messages() {
  const [editMessage, setEditMessage] = useState(null)

  useEffect(() => {
    StoreMessages.getAllMessage()
    console.log(StoreMessages.messages)
  }, [])

  const {register, handleSubmit} = useForm()
  
  return (
    <>
      <div>Пользователь: {storeAuthorization.user?.email}</div>
      <div>Сообщения</div>
      <div>Исходящие</div>
      {StoreMessages.messages?.sent?.map(e => (
        <>
          <div>От {e.fromid} К {e.toid} Текст: {e.text}</div>
          <button>Изменить</button>
          <button>Удалить</button>
        </>
      ))}
      <div>Входящие</div>
      {StoreMessages.messages?.received?.map(e => (
        <>
          <div>От {e.fromid} К {e.toid} Текст: {e.text}</div>
        </>
      ))}
      <br />
      <form onSubmit={handleSubmit((data: Message) => StoreMessages.sendMessage(data))}>
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