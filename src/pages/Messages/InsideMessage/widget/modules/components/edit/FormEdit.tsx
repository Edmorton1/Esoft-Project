import { MessageContext } from "@/pages/Messages/InsideMessage/widget/modules/MessageHead";
import { useContext } from "react";

function FormEdit() {

  const ctx = useContext(MessageContext)!

  function DeletingFiles() {
    return ctx.files?.old?.map(item => (
      <div key={item}>
        {item}
        <button onClick={() => ctx.clickDeleteFile(item)}>удалить</button>
      </div>
    ))
  }

	return <>
	<button onClick={() => console.log(ctx.files)}>Вывести файлы</button>
		<input type="text" onChange={ctx.textInput} defaultValue={ctx.value} />
		<br />
		<div>
			<DeletingFiles />
		</div>
		<br />
		<div>Добавить</div>
		<input onChange={ctx.inputNewFile} type="file" multiple />
		<button onClick={ctx.submitClick}>Готово</button>
	</>
}

export default FormEdit;
