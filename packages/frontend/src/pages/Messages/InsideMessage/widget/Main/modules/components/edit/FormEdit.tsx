import { MessageContext } from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/MessageHead";
import { useContext } from "react";
import * as style from "@app/client/shared/css/modules/FormEdit.module.scss"
import Paper from "@mui/material/Paper";
import MicroFile from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/components/edit/MicroFile";
import AddFiles from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/components/kit/AddFiles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MinButton from "@app/client/shared/ui/mui_components/MinButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { sxStyle } from "@app/client/shared/ui/mui_components/CircleButton";
import { createPortal } from "react-dom";
import CheckIcon from '@mui/icons-material/Check';

import * as section from "@app/client/shared/css/pages/MessagesInside.module.scss"

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
			<MinButton variant="contained" color="error" onClick={ctx.deleteClick}><DeleteIcon sx={sxStyle} /></MinButton>
			<MinButton onClick={ctx.submitClick} variant="contained" sx={{height: "100%"}}><CheckIcon sx={sxStyle} /></MinButton>
		</div>
	</Paper>, document.getElementsByClassName(section.section__widget)[0])
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