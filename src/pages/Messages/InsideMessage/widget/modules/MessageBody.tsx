import FormEdit from "@/pages/Messages/InsideMessage/widget/modules/components/edit/FormEdit";
import FileComponent from "@/pages/Messages/InsideMessage/widget/modules/components/file/FileComponent";
import StoreMessages from "@/pages/Messages/store/Store-Messages";
import StoreForm from "@/shared/stores/Store-Form"
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PLACEHOLDER_IMG } from "@shared/PUBLIC_IMG";
import { Message } from "@t/gen/Users"
import { memo } from "react";

interface propsInterface {
  editing: boolean,
  msg: Message,
  changeClick: () => void,
  deleteClick: () => void,
}

function MessageBody({editing, msg, changeClick, deleteClick}: propsInterface) {
  const isAuthor = msg.fromid === StoreForm.form?.id
  // console.log('COMPONENT RENDER', msg.id, editing, files)
  
  return <Paper onClick={changeClick} elevation={editing ? 1 : 0} sx={{width: "100%", cursor: "pointer", bgcolor: editing ? "background.paper" : "transparent"}}>
    <CardHeader sx={{p: 0.5}}
      avatar={<Avatar src={isAuthor ? StoreForm.form?.avatar ?? PLACEHOLDER_IMG : StoreMessages.form?.avatar ?? PLACEHOLDER_IMG} />}
      title={<Typography variant="subtitle1" color="primary">{isAuthor ? StoreForm.form?.name : StoreMessages.form?.name}</Typography>}
      subheader={<div style={{display: "flex", justifyContent: "space-between"}}>
        <Typography color="text.primary">{msg.text}</Typography>
        <Typography>{new Date(msg.created_at).toLocaleString()}</Typography>
        {editing && <FormEdit />}
      </div>}
      />
    {msg.files?.length && <CardContent>
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