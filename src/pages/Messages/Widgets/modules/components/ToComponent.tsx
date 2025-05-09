import useGetById from "@/shared/hooks/useGetById"
import { Message } from "@s/core/domain/Users"
import { memo } from "react"

const ToComponent = ({msg}: {msg: Message}) => {
  // console.log("TO COMPONENT RENDER", msg.id)

  //@ts-ignore
  const to = useGetById(`/forms?id=${msg.toid}`, 'single')
  
  const datetime = `${new Date(msg.created_at!).toLocaleDateString()} ${new Date(msg.created_at!).toLocaleTimeString()}`

  //@ts-ignore
  return <div>От {msg.fromid} К {to?.name} {datetime}</div>
}

export default memo(ToComponent)