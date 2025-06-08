import { observer } from "mobx-react-lite"
import StoreForm from "@/shared/stores/Store-Form"
import MessageWidget from "@/pages/Messages/InsideMessage/widget/MessageWidget"
// import useMedia from "@/shared/hooks/useMedia"
import VoiceMessage from "@/pages/Messages/InsideMessage/widget/modules/classes/VoiceMessage"
import { useParams } from "react-router-dom"
import SentHead from "@/pages/Messages/InsideMessage/widget/modules/components/sent/SentHead"
import useGetBy from "@/shared/hooks/useGetBy"
import { serverPaths } from "@shared/PATHS"
import { z } from "zod"
import StoreUser from "@/shared/stores/Store-User"
import StoreMessages from "@/pages/Messages/store/Store-Messages"
import { useEffect } from "react"

function Messages() {
  const toid = z.coerce.number().parse(useParams().toid)

  useGetBy(`${serverPaths.getMessage}/${StoreUser.user?.id}/${toid}`, {callback: (data) => StoreMessages.initial(data)})

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [])
  
    // const [voiceRef] = useMedia(VoiceMessage, undefined, toid)
  
  return (
    <>
      {/* <div>Пользователь: {StoreForm.form?.name}</div>
      <div>Сообщения</div>
      <div>Исходящие</div> */}
      <MessageWidget />
      {/* <br /> */}
      <SentHead toid={toid!}/>
      {/* <br />
      <br /> */}
      {/* <button onClick={() => console.log(voiceRef.current?.stream.getVideoTracks(), voiceRef.current?.stream.getAudioTracks())}>Посмотреть видео аудио дорожки</button>
      <br />
      <br />
      <button onClick={() => voiceRef.current!.start()}>Начать запись голоса</button>
      <button onClick={() => voiceRef.current!.stop()}>Завершить</button>
      <button onClick={() => console.log(voiceRef)}>Чанки</button> */}
    </>
  )
}

export default observer(Messages)