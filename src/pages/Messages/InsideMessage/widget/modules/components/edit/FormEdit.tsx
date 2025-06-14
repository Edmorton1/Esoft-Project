import { MessageContext } from "@/pages/Messages/InsideMessage/widget/modules/MessageHead";
import { useContext } from "react";
import * as style from "@/shared/css/modules/FormEdit.module.scss"
import Paper from "@mui/material/Paper";
import MicroFile from "@/pages/Messages/InsideMessage/widget/modules/components/edit/MicroFile";
import AddFiles from "@/pages/Messages/InsideMessage/widget/modules/components/kit/AddFiles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonLocal from "@/pages/Messages/InsideMessage/widget/modules/components/kit/ButtonLocal";
import DeleteIcon from '@mui/icons-material/Delete';
import { sxStyle } from "@/shared/ui/kit/CircleButton";
import { createPortal } from "react-dom";
import CheckIcon from '@mui/icons-material/Check';

import * as section from "@/shared/css/pages/MessagesInside.module.scss"

function FormEdit() {

  const ctx = useContext(MessageContext)!

  function DeletingFiles() {
    return ctx.files?.old?.map(item => (
      <div key={item}>
        <MicroFile fileLink={item} onClick={() => ctx.clickDeleteFile(item)} />
        {/* <button onClick={() => ctx.clickDeleteFile(item)}>удалить</button> */}
      </div>
    ))
  }

	return createPortal(
		<Paper component="div" className={style.main} elevation={1} onClick={e => e.stopPropagation()} sx={{border: "2px solid", borderColor: "primary"}}>
		<div className={style.main__files}>
			<DeletingFiles />
		</div>
		<div className={style.main__redact}>
			<AddFiles onChangeAdd={ctx.inputNewFile} />
			<TextField type="text" onChange={ctx.textInput} defaultValue={ctx.value} sx={{flex: 1}} />
			<ButtonLocal variant="contained" color="error" onClick={ctx.deleteClick}><DeleteIcon sx={sxStyle} /></ButtonLocal>
			<ButtonLocal onClick={ctx.submitClick} variant="contained" sx={{height: "100%"}}><CheckIcon sx={sxStyle} /></ButtonLocal>
		</div>
	</Paper>, document.getElementsByClassName(section.section)[0])
}

export default FormEdit;

	// return <Paper component="div" className={style.main} sx={{backgroundColor: "bacgkround.alt"}}>
	// 	{/* <button onClick={() => console.log(ctx.files)}>Вывести файлы</button> */}
	// 	<input type="text" onChange={ctx.textInput} defaultValue={ctx.value} />
	// 	<div className={style.main__files}>
	// 		<DeletingFiles />
	// 	</div>
	// 	<AddFiles handleFile={} />
	// 	<div>Добавить</div>
	// 	<input onChange={ctx.inputNewFile} type="file" multiple />
	// 	<button onClick={ctx.submitClick}>Готово</button>
	// </Paper>