import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import { paths } from "@shared/PATHS"
import { PLACEHOLDER_IMG } from "@shared/PUBLIC"
import { Form, Message } from "@t/gen/Users"
import { Link } from "react-router-dom"

type propsType = Pick<Form, "id" | "avatar" | "name"> & Pick<Message, "text" | "created_at">

function MessageBranch({id, avatar, name, text, created_at}: propsType) {
  return <Link to={`${paths.messages}/${id}`} style={{width: "100%"}}>
    <Card>
      <CardHeader sx={{p: 0.5, pl: 2}}
        avatar={<Avatar src={avatar ?? PLACEHOLDER_IMG} />}
        title={<Typography>{name}</Typography>}
        subheader={<>
          <Typography>{new Date(created_at).toLocaleString()}</Typography>
          <Typography color="text.primary">{text}</Typography>
        </>}
      />
    </Card>
  </Link>
}

export default MessageBranch
