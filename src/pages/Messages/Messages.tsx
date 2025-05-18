import StoreMessages from "@/pages/Messages/widgets/modules/store/Store-Messages"
import { observer } from "mobx-react-lite"
import { useForm } from "react-hook-form"
import StoreForm from "@/shared/stores/Store-Form"
import { MessageDTO } from "@s/core/dtoObjects"
import MessageWidget from "./widgets/MessageWidget"
import useMedia from "@/shared/hooks/useMedia"
import VoiceMessage from "@/pages/Messages/widgets/modules/classes/VoiceMessage"
import { useParams } from "react-router-dom"

function Messages() {
  const {register, handleSubmit} = useForm<MessageDTO>()

  const {toid} = useParams()
    const [voiceRef] = useMedia(VoiceMessage, undefined, toid)
  
  return (
    <>
      <div>Пользователь: {StoreForm.form?.name}</div>
      <div>Сообщения</div>
      <div>Исходящие</div>
      <MessageWidget />
      <br />
      <form onSubmit={handleSubmit((data: MessageDTO) => StoreMessages.send({...data, toid: toid!, fromid: StoreForm.form!.id!}))} style={{display: "flex", flexDirection: "column", width: "300px"}}>
        <div>Отправить сообщение</div>
        {/* <input {...register('fromid', {valueAsNumber: true})} type="number" placeholder="От кого?" /> */}
        {/* <input {...register('toid', {valueAsNumber: true})} type="number" placeholder="К кому?" /> */}
        <label htmlFor="text">Текст</label>
        <input {...register('text')} type="text" defaultValue={"text test"} id="text" />
        <label htmlFor="files">Файлы</label>
        <input {...register("files")} type="file" multiple id="files" />
        <button>Отпраивть</button>
      </form>
      <br />
      <br />
      <button onClick={() => console.log(voiceRef.current?.stream.getVideoTracks(), voiceRef.current?.stream.getAudioTracks())}>Посмотреть видео аудио дорожки</button>
      <br />
      <br />
      <button onClick={() => voiceRef.current!.start()}>Начать запись голоса</button>
      <button onClick={() => voiceRef.current!.stop()}>Завершить</button>
      <button onClick={() => console.log(voiceRef)}>Чанки</button>
    </>
  )
}

export default observer(Messages)