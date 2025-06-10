import { observer } from "mobx-react-lite"
import MessageWidget from "@/pages/Messages/InsideMessage/widget/MessageWidget"
import { useParams } from "react-router-dom"
import SentHead from "@/pages/Messages/InsideMessage/widget/modules/components/sent/SentHead"
import useGetBy from "@/shared/hooks/useGetBy"
import { serverPaths } from "@shared/PATHS"
import { z } from "zod"
import StoreUser from "@/shared/stores/Store-User"
import StoreMessages from "@/pages/Messages/store/Store-Messages"
import { useEffect, useState } from "react"
import $api from "@/shared/api/api"

function Messages() {
  const toid = z.coerce.number().parse(useParams().toid)

    // const [voiceRef] = useMedia(VoiceMessage, undefined, toid)
  
  return <>
      <MessageWidget toid={toid} />
      <SentHead toid={toid!}/>
      <button onClick={() => console.log(StoreMessages.cursor)}>Курсор</button>
    </>
}

export default observer(Messages)

      {/* <div>Пользователь: {StoreForm.form?.name}</div>
      <div>Сообщения</div>
      <div>Исходящие</div> */}
      {/* <br />
      <br /> */}
      {/* <button onClick={() => console.log(voiceRef.current?.stream.getVideoTracks(), voiceRef.current?.stream.getAudioTracks())}>Посмотреть видео аудио дорожки</button>
      <br />
      <br />
      <button onClick={() => voiceRef.current!.start()}>Начать запись голоса</button>
      <button onClick={() => voiceRef.current!.stop()}>Завершить</button>
      <button onClick={() => console.log(voiceRef)}>Чанки</button> */}