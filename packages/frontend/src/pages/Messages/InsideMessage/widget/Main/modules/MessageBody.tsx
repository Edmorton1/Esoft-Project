import FormEdit from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/components/edit/FormEdit";
import FileComponent from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/components/file/FileComponent";
import StoreForm from "@app/client/shared/stores/Store-Form"
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PLACEHOLDER_IMG } from "@app/shared/PUBLIC";
import { Message } from "@app/types/gen/Users"
import { memo, useContext } from "react";
import * as style from "@app/client/shared/css/pages/MessagesInside.module.scss"
import { MessagesContext } from "@app/client/pages/Messages/InsideMessage/Messages";
import { paths } from "@app/shared/PATHS";
import { Link } from "react-router-dom";
import UnderTypo from "@app/client/shared/ui/mui_components/UnderTypo";

interface propsInterface {
  editing: boolean,
  msg: Message,
  changeClick: () => void,
}

function MessageBody({editing, msg, changeClick}: propsInterface) {
  const isAuthor = msg.fromid === StoreForm.form?.id
  const StoreMessages = useContext(MessagesContext)!

  const url = `${paths.profile}/${msg.fromid}`
  // console.log("МЕССАДЖ РЕНДРР")
  // console.log('COMPONENT RENDER', msg.id, editing, files)
  
  return <Paper component={"article"} onClick={changeClick} elevation={editing ? 1 : 0} sx={{width: "100%", bgcolor: editing ? "background.paper" : "transparent"}}>
    <Divider></Divider>
    <CardHeader
      avatar={<Link to={url}><Avatar src={isAuthor ? StoreForm.form?.avatar ?? PLACEHOLDER_IMG : StoreMessages.form?.avatar ?? PLACEHOLDER_IMG} /></Link>}
      title={<Link to={url}><UnderTypo variant="subtitle1" color="primary">{isAuthor ? StoreForm.form?.name : StoreMessages.form?.name}</UnderTypo></Link>}
      // subheader={<div style={{display: "flex", justifyContent: "space-between"}}>
      subheader={<div>
        <Typography color="text.primary">{msg.text}</Typography>
        <Typography>{new Date(msg.created_at).toLocaleString()}</Typography>
        {editing && <FormEdit />}
      </div>}
      />
    {msg.files && msg.files?.length > 0 && <CardContent className={style['section__widget--files']}>
      {msg.files.map(link => <FileComponent key={link} fileLink={link} />)}
    </CardContent>}
  </Paper>
}

export default memo(MessageBody)

      // {msg.fromid === StoreForm.form?.id && !editing && <>
      //   <button onClick={changeClick}>Изменить</button>
      //   <button onClick={deleteClick}>Удалить</button>
      // </>}
      // {msg.files?.map(link => <FileComponent key={link} fileLink={link} />)}
      // {editing && <FormEdit />}