import useGetBy from "@/shared/hooks/useGetBy"
import { Form, Message } from "@s/core/domain/Users"
import { memo } from "react"

const ToComponent = ({msg}: {msg: Message}) => {
  // console.log("TO COMPONENT RENDER", msg.id)

  const to = useGetBy<'forms'>(`/forms?id=${msg.toid}`, {
    returnOne: true
  })
  
  const datetime = `${new Date(msg.created_at!).toLocaleDateString()} ${new Date(msg.created_at!).toLocaleTimeString()}`

  return <div>От {msg.fromid} К {to?.name} {datetime}</div>
}

export default memo(ToComponent)