import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import { paths } from "@shared/PATHS"
import { PLACEHOLDER_IMG } from "@shared/PUBLIC_IMG"
import { Link } from "react-router-dom"

interface propsInterface {
  id: number,
  avatar?: string,
  name: string,
  text: string,
  created_at: Date
}

function MessageBranch({id, avatar, name, text, created_at}: propsInterface) {
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
