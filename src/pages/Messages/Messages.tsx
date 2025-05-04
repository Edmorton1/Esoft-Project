import StoreMessages from "@/pages/Messages/widgets/modules/store/Store-Messages"
import { Message } from "@s/core/domain/Users"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import StoreForm from "@/shared/stores/Store-Form"
import MessageModule from "@/pages/Messages/widgets/modules/MessageModule"
import { MessageDTO } from "@s/core/dtoObjects"
import MessageWidget from "./widgets/MessageWidget"

function Messages() {
  const {register, handleSubmit} = useForm<MessageDTO>()
  
  return (
    <>
      <div>Пользователь: {StoreForm.form?.name}</div>
      <div>Сообщения</div>
      <div>Исходящие</div>
      <MessageWidget />
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