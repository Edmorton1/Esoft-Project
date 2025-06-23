import { observer } from "mobx-react-lite"
import MessageWidget from "@/pages/Messages/InsideMessage/widget/Main/MessageWidget"
import { useParams } from "react-router-dom"
import SentHead from "@/pages/Messages/InsideMessage/widget/Main/modules/components/sent/SentHead"
import { z } from "zod"
import * as style from "@/shared/css/pages/MessagesInside.module.scss"
import MainHead from "@/pages/Messages/InsideMessage/widget/Head/MainHead"
import StoreMessagesManager from "@/pages/Messages/store/Store-Messages-Manager"
import StoreMessages from "@/pages/Messages/store/Store-Messages"
import { createContext } from "react"

export const MessagesContext = createContext<StoreMessages | null>(null)

function Messages() {
  const toid = z.coerce.number().parse(useParams().toid)

  const Store = StoreMessagesManager.getOrCreateStore(toid)
  
  return <MessagesContext.Provider value={Store}>
    <section className={style.section}>
      <MainHead toid={toid} />
      <MessageWidget toid={toid} />
      <SentHead toid={toid}/>
      {/* <button onClick={() => console.log(StoreMessages.cursor)}>Курсор</button> */}
    </section>
  </MessagesContext.Provider>
}

export default observer(Messages)
