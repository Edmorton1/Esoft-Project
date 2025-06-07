import { paths } from "@shared/PATHS"
import { Link } from "react-router-dom"

interface propsInterface {
  id: number,
  avatar?: string,
  name: string,
  text: string,
  created_at: Date
}

function MessageBranch({id, avatar, name, text, created_at}: propsInterface) {
  return <Link to={`${paths.messages}/${id}`}>
    <div>{avatar}</div>
    <div>{name}</div>
    <div>{text}</div>
    <div>{new Date(created_at).toString()}</div>
    <br />
  </Link>
}

export default MessageBranch