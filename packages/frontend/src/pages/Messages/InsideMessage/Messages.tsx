import { observer } from "mobx-react-lite"
import MessageWidget from "@app/client/pages/Messages/InsideMessage/widget/Main/MessageWidget"
import { useParams } from "react-router-dom"
import SentHead from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/components/sent/SentHead"
import { z } from "zod"
import * as style from "@app/client/shared/css/pages/MessagesInside.module.scss"
import MainHead from "@app/client/pages/Messages/InsideMessage/widget/Head/MainHead"
import StoreMessagesManager from "@app/client/pages/Messages/store/Store-Messages-Manager"
import StoreMessages from "@app/client/pages/Messages/store/Store-Messages"
import { createContext } from "react"
import Subtitle from "@app/client/shared/ui/mui_components/Subtitles"

export const MessagesContext = createContext<StoreMessages | null>(null)

function Messages() {
  
  const toid = z.coerce.number().parse(useParams().toid)

  const Store = StoreMessagesManager.getOrCreateStore(toid)
  
  return <MessagesContext.Provider value={Store}>
    <>
      <MainHead toid={toid} />
      <MessageWidget toid={toid} />
      {Store.is_match 
        ? <SentHead toid={toid}/>
        : <Subtitle className={style.section__form} >Вы не можете писать и звонить этому пользователю, пока не понравитесь ему</Subtitle>
      }
      {/* <button onClick={() => console.log(StoreMessages.cursor)}>Курсор</button> */}
    </>
  </MessagesContext.Provider>
}

export default observer(Messages)
