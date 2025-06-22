import { observer } from "mobx-react-lite"
import MessageWidget from "@/pages/Messages/InsideMessage/widget/Main/MessageWidget"
import { useParams } from "react-router-dom"
import SentHead from "@/pages/Messages/InsideMessage/widget/Main/modules/components/sent/SentHead"
import { z } from "zod"
import * as style from "@/shared/css/pages/MessagesInside.module.scss"
import MainHead from "@/pages/Messages/InsideMessage/widget/Head/MainHead"

function Messages() {
  const toid = z.coerce.number().parse(useParams().toid)
  
  return <section className={style.section}>
      <MainHead toid={toid} />
      <MessageWidget toid={toid} />
      <SentHead toid={toid!}/>
      {/* <button onClick={() => console.log(StoreMessages.cursor)}>Курсор</button> */}
    </section>
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