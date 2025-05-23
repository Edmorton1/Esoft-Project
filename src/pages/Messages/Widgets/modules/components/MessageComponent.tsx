import ToComponent from "@/pages/Messages/widgets/modules/components/ToComponent";
import StoreForm from "@/shared/stores/Store-Form"
import { Message } from "@t/gen/Users"
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

type resolutions = 'ogg' | 'webp' | 'mp4'

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
      {msg.files?.map(link => {
        const type = (link.split('.').splice(-1)[0] as resolutions)
        console.log(type)
        switch (type) {
          case 'webp':
            return <img src={link} alt="" />
          case 'mp4':
            return <video controls src={link}></video>
          case 'ogg':
            return <audio controls src={link}></audio>
        }
      })}
    </div>
    <br />
    {msg.fromid === StoreForm.form?.id && !editing && <>
      <button onClick={changeClick}>Изменить</button>
      <button onClick={deleteClick}>Удалить</button>
    </>}
  </>
}

export default memo(MessageComponent)