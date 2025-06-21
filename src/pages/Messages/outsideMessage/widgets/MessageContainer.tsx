import MessageBranch from "@/pages/Messages/outsideMessage/widgets/components/MessageBranch"
import StoreMessage from "@/pages/Messages/store/Store-Message"
import useGetBy from "@/shared/hooks/useGetBy"
import StoreUser from "@/shared/stores/Store-User"
import { serverPaths } from "@shared/PATHS"
import { observer } from "mobx-react-lite"
import * as styles from "@/shared/css/pages/Messages.module.scss"

function MessageContainer() {
  useGetBy(`${serverPaths.outsideMessages}`, {callback: (data) => StoreMessage.initial(data)})
  console.log(StoreMessage.lastMessages)
  
  // return <div>asdasdsda</div>

    return <section className={styles.section}>
    {StoreMessage.lastMessages?.map(e => <MessageBranch id={e.form.id} avatar={e.form.avatar} name={e.form.name} text={e.message.text} created_at={e.message.created_at} key={e.form.id}/>)}
    <button onClick={() => console.log(StoreMessage.lastMessages)}>LOG</button>
  </section>
}

export default observer(MessageContainer)