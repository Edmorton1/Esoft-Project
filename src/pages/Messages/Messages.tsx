import { observer } from "mobx-react-lite"
import StoreForm from "@/shared/stores/Store-Form"
import MessageWidget from "./widgets/MessageWidget/MessageWidget"
import useMedia from "@/shared/hooks/useMedia"
import VoiceMessage from "@/pages/Messages/widgets/MessageWidget/modules/classes/VoiceMessage"
import { useParams } from "react-router-dom"
import SentHead from "@/pages/Messages/widgets/MessageWidget/modules/components/sent/SentHead"

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
      <SentHead toid={toid!}/>
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