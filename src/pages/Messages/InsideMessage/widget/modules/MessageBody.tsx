import FormEdit from "@/pages/Messages/InsideMessage/widget/modules/components/edit/FormEdit";
import FileComponent from "@/pages/Messages/InsideMessage/widget/modules/components/file/FileComponent";
import StoreMessages from "@/pages/Messages/store/Store-Messages";
import StoreForm from "@/shared/stores/Store-Form"
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
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
  
  return <Card>
    <CardHeader 
      avatar={<Avatar src={isAuthor ? StoreForm.form?.avatar ?? PLACEHOLDER_IMG : StoreMessages.form?.avatar ?? PLACEHOLDER_IMG} />}
      title={<Typography variant="subtitle1">{StoreMessages.form?.name}</Typography>}
      />
    <CardContent>
      <Typography>{msg.text}</Typography>
      {msg.files?.map(link => <FileComponent key={link} fileLink={link} />)}
      {editing && <FormEdit />}
      {msg.fromid === StoreForm.form?.id && !editing && <>
        <button onClick={changeClick}>Изменить</button>
        <button onClick={deleteClick}>Удалить</button>
      </>}
    </CardContent>
  </Card>
}

export default memo(MessageBody)

{/* {msg.files?.map(link => <FileComponent key={link} fileLink={link} />)} */}

  // return <>
  //   <br />
  //   <div>
  //     <p>Текст: {msg.text}</p>
  //     {editing && <FormEdit />}
  //   </div>
  //   <br />
    // {msg.fromid === StoreForm.form?.id && !editing && <>
    //   <button onClick={changeClick}>Изменить</button>
    //   <button onClick={deleteClick}>Удалить</button>
    // </>}
  // </>