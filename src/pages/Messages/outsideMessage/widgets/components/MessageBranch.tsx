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
  return <Link to={`${paths.messages}/${id}`}>
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Avatar src={avatar ?? PLACEHOLDER_IMG} />}
        title={<Typography variant="subtitle1">{name}</Typography>}
        subheader={new Date(created_at).toLocaleString()}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1">{text}</Typography>
      </CardContent>
    </Card>
  </Link>
}

export default MessageBranch

  // return <Link to={`${paths.messages}/${id}`}>
  //   <div>{avatar}</div>
  //   <div>{name}</div>
  //   <div>{text}</div>
  //   <div>{new Date(created_at).toString()}</div>
  //   <br />
  // </Link>