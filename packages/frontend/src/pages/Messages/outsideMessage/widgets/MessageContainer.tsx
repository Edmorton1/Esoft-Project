import MessageBranch from "@app/client/pages/Messages/outsideMessage/widgets/components/MessageBranch"
import StoreMessage from "@app/client/pages/Messages/store/Store-Message"
import useGetBy from "@app/client/shared/hooks/useGetBy"
import { serverPaths } from "@app/shared/PATHS"
import { observer } from "mobx-react-lite"
import * as styles from "@app/client/shared/css/pages/Messages.module.scss"
import EmptyText, { emptyGrid } from "@app/client/shared/ui/mui_components/EmptyText"

function MessageContainer() {
  useGetBy(`${serverPaths.outsideMessages}`, {callback: (data) => StoreMessage.initial(data)})
  console.log(StoreMessage.lastMessages)
  
  // return <div>asdasdsda</div>

    return <section className={styles.section} style={emptyGrid(StoreMessage.lastMessages?.length)}>
    {StoreMessage.lastMessages?.length
      ? StoreMessage.lastMessages?.map(e => <MessageBranch id={e.form.id} avatar={e.form.avatar} name={e.form.name} text={e.message.text} created_at={e.message.created_at} key={e.form.id}/>)
      : <EmptyText />}
    {/* <button onClick={() => console.log(StoreMessage.lastMessages)}>LOG</button> */}
  </section>
}

export default observer(MessageContainer)

{/* <Typography style={{textAlign: "center"}} color="text.secondary">Похоже, что здесь пока ничего нет</Typography> */}