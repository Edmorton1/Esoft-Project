import FormEdit from "@/pages/Messages/InsideMessage/widget/modules/components/edit/FormEdit";
import FileComponent from "@/pages/Messages/InsideMessage/widget/modules/components/file/FileComponent";
import ToComponent from "@/pages/Messages/InsideMessage/widget/modules/components/static/ToComponent";
import StoreForm from "@/shared/stores/Store-Form"
import { Message } from "@t/gen/Users"
import { memo } from "react";

interface propsInterface {
  editing: boolean,
  msg: Message,
  changeClick: () => void,
  deleteClick: () => void,
}

function MessageBody({editing, msg, changeClick, deleteClick}: propsInterface) {
  // console.log('COMPONENT RENDER', msg.id, editing, files)
  
  return <>
    <ToComponent msg={msg} />
    <br />
    <div>
      <p>Текст: {msg.text}</p>
      {editing && <FormEdit />}
      {msg.files?.map(link => <FileComponent key={link} fileLink={link} />)}
    </div>
    <br />
    {msg.fromid === StoreForm.form?.id && !editing && <>
      <button onClick={changeClick}>Изменить</button>
      <button onClick={deleteClick}>Удалить</button>
    </>}
  </>
}

export default memo(MessageBody)