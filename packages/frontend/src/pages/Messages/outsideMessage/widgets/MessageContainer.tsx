import MessageBranch from "@app/client/pages/Messages/outsideMessage/widgets/components/MessageBranch"
import StoreMessagesOutside from "@app/client/pages/Messages/store/Store-MessagesOutside"
import useGetBy from "@app/client/shared/hooks/useGetBy"
import { serverPaths } from "@app/shared/PATHS"
import { observer } from "mobx-react-lite"
import * as styles from "@app/client/shared/css/pages/Messages.module.scss"
import EmptyText, { emptyGrid } from "@app/client/shared/ui/mui_components/EmptyText"

function MessageContainer() {
  useGetBy(`${serverPaths.outsideMessages}`, {callback: (data) => StoreMessagesOutside.initial(data)})
  console.log(StoreMessagesOutside.lastMessages)
  
  // return <div>asdasdsda</div>

    return <section className={styles.section} style={emptyGrid(StoreMessagesOutside.lastMessages?.length)}>
    {StoreMessagesOutside.lastMessages?.length
      ? StoreMessagesOutside.lastMessages?.map(e => <MessageBranch id={e.form.id} avatar={e.form.avatar} name={e.form.name} text={e.message.text} created_at={e.message.created_at} key={e.form.id}/>)
      : <EmptyText />}
    {/* <button onClick={() => console.log(StoreMessage.lastMessages)}>LOG</button> */}
  </section>
}

export default observer(MessageContainer)

{/* <Typography style={{textAlign: "center"}} color="text.secondary">Похоже, что здесь пока ничего нет</Typography> */}