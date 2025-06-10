import { MessageContext } from "@/pages/Messages/InsideMessage/widget/modules/MessageHead";
import { useContext } from "react";
import * as style from "@/shared/css/modules/FormEdit.module.scss"
import Paper from "@mui/material/Paper";

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

	return <Paper className={style.main}>
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
	</Paper>
}

export default FormEdit;
