import FormEdit from "@/pages/Messages/InsideMessage/widget/Main/modules/components/edit/FormEdit";
import FileComponent from "@/pages/Messages/InsideMessage/widget/Main/modules/components/file/FileComponent";
import StoreMessages from "@/pages/Messages/store/Store-Messages";
import StoreForm from "@/shared/stores/Store-Form"
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PLACEHOLDER_IMG } from "@shared/PUBLIC";
import { Message } from "@t/gen/Users"
import { memo } from "react";
import * as style from "@/shared/css/pages/MessagesInside.module.scss"

interface propsInterface {
  editing: boolean,
  msg: Message,
  changeClick: () => void,
}

function MessageBody({editing, msg, changeClick}: propsInterface) {
  const isAuthor = msg.fromid === StoreForm.form?.id
  console.log("МЕССАДЖ РЕНДРР")
  // console.log('COMPONENT RENDER', msg.id, editing, files)
  
  return <Paper component={"article"} onClick={changeClick} elevation={editing ? 1 : 0} sx={{width: "100%", bgcolor: editing ? "background.paper" : "transparent"}}>
    <Divider></Divider>
    <CardHeader
      avatar={<Avatar src={isAuthor ? StoreForm.form?.avatar ?? PLACEHOLDER_IMG : StoreMessages.form?.avatar ?? PLACEHOLDER_IMG} />}
      title={<Typography variant="subtitle1" color="primary">{isAuthor ? StoreForm.form?.name : StoreMessages.form?.name}</Typography>}
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