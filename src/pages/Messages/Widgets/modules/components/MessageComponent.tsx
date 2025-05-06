import ToComponent from "@/pages/Messages/widgets/modules/components/ToComponent";
import useGetById from "@/shared/hooks/useGetById"
import StoreForm from "@/shared/stores/Store-Form"
import { Message } from "@s/core/domain/Users"
import { memo } from "react";

interface propsInterface {
  editing: boolean,
  msg: Message,
  value: string,
  files: { new: FileList | null; old: string[] | null } | null,

  changeClick: () => void,
  deleteClick: () => void,
  clickDeleteFile: (item: string) => any,
  inputNewFile: (e: React.ChangeEvent<HTMLInputElement>) => any,
  textInput: (e: React.ChangeEvent<HTMLInputElement>) => any,
  submitClick: () => any
}

const MessageComponent = ({editing, msg, changeClick, deleteClick, files, value, inputNewFile, textInput, submitClick, clickDeleteFile}: propsInterface) => {
  // console.log('COMPONENT RENDER', msg.id, editing, files)
  function DeletedFiles() {
    return files?.old?.map(item => (
      <div key={item}>
        {item}
        <button onClick={() => clickDeleteFile(item)}>удалить</button>
      </div>
    ))
  }
  
  return <>
    <ToComponent msg={msg} />
    <br />
    <div>
      <p>Текст: {msg.text}</p>
      {editing && <>
        <input type="text" onChange={textInput} defaultValue={value} />
        <br />
        <div>
          <DeletedFiles />
        </div>
        <br />
        <div>Добавить</div>
        <input onChange={inputNewFile} type="file" multiple />
        <button onClick={submitClick}>Готово</button>
      </>}
    </div>
    <br />
    {msg.fromid === StoreForm.form?.id && !editing && <>
      <button onClick={changeClick}>Изменить</button>
      <button onClick={deleteClick}>Удалить</button>
    </>}
  </>
}

export default memo(MessageComponent)