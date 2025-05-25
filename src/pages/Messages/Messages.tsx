import { observer } from "mobx-react-lite"
import { useForm } from "react-hook-form"
import StoreForm from "@/shared/stores/Store-Form"
import MessageWidget from "./widgets/static/MessageWidget"
import useMedia from "@/shared/hooks/useMedia"
import VoiceMessage from "@/pages/Messages/widgets/static/modules/classes/VoiceMessage"
import { useParams } from "react-router-dom"
import { MessageDTOClient } from "@t/client/DTOClient"
import FormSentWidget from "@/pages/Messages/widgets/manipul/FormSentWidget"

function Messages() {
  const {toid} = useParams<{toid: string}>()
    const [voiceRef] = useMedia(VoiceMessage, undefined, toid)
  
  return (
    <>
      <div>Пользователь: {StoreForm.form?.name}</div>
      <div>Сообщения</div>
      <div>Исходящие</div>
      <MessageWidget />
      <br />
      <FormSentWidget toid={toid!}/>
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