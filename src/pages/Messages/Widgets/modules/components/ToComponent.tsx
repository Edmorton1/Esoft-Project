import useGetById from "@/shared/hooks/useGetById"
import { Message } from "@s/core/domain/Users"
import { memo } from "react"

const ToComponent = ({msg}: {msg: Message}) => {
  // console.log("TO COMPONENT RENDER", msg.id)

  const to = useGetById<'forms'>(`/forms?id=${msg.toid}`, 'single')
  
  const datetime = `${new Date(msg.created_at!).toLocaleDateString()} ${new Date(msg.created_at!).toLocaleTimeString()}`

  return <div>От {msg.fromid} К {to?.name} {datetime}</div>
}

export default memo(ToComponent)