import storeAuthorization from "@/store/store-authorization"
import StoreMessages from "@/store/Store-Messages"
import { Message } from "@s/core/domain/Users"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

function Messages() {
  useEffect(() => {
    StoreMessages.getAllMessage()
  }, [])

  const {register, handleSubmit} = useForm()
  
  return (
    <>
      <div>Пользователь: {storeAuthorization.user?.email}</div>
      <div>Сообщения</div>
      {StoreMessages.messages.map(e => (
        <div>От {e.fromid} К {e.toid} Текст: {e.text}</div>
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