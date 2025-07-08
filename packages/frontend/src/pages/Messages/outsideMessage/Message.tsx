import MessageContainer from "@app/client/pages/Messages/outsideMessage/widgets/MessageContainer"
import StoreUser from "@app/client/shared/stores/Store-User"
import EmptyText from "@app/client/shared/ui/mui_components/EmptyText"
import Title from "@app/client/shared/ui/mui_components/Ttile"

function Message() {
  
  if (!StoreUser.user) {
    return <EmptyText infoType="no-authorize" />
  }

  return <>
    <Title>Сообщения</Title>
    <MessageContainer />
  </>
}

export default Message