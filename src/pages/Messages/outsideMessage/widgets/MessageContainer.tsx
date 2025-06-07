import MessageBranch from "@/pages/Messages/outsideMessage/widgets/components/MessageBranch"
import StoreMessage from "@/pages/Messages/store/Store-Message"
import useGetBy from "@/shared/hooks/useGetBy"
import StoreUser from "@/shared/stores/Store-User"
import { serverPaths } from "@shared/PATHS"
import { observer } from "mobx-react-lite"

function MessageContainer() {
  useGetBy(`${serverPaths.outsideMessages}/${StoreUser.user?.id}`, {callback: (data) => StoreMessage.initial(data)})
  
  // return <div>asdasdsda</div>

    return <>
    {StoreMessage.lastMessages?.map(e => <MessageBranch id={e.form.id} avatar={e.form.avatar} name={e.form.name} text={e.message.text} created_at={e.message.created_at} key={e.form.id}/>)}
  </>
}

export default observer(MessageContainer)