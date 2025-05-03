import { useContext } from "react";
import { MessageContext } from "../../MessageFeature";

function MessageEdit() {
  const context = useContext(MessageContext)

  function DeletedFiles() {
    return context?.files?.old?.map(item => (
      <div key={item}>
        {item}
        <button onClick={() => context.clickDeleteFile(item)}>удалить</button>
      </div>
    ))
  }

  return <>
    <input type="text" onChange={context?.textInput} defaultValue={context?.value} />
    <br />
    <div>
      <DeletedFiles />
    </div>
    <br />
    <div>Добавить</div>
    <input onChange={context?.inputNewFile} type="file" multiple />
    <button onClick={context?.submitClick}>Готово</button>
  </>
}

export default MessageEdit