import { SubmitHandler, UseFormRegister } from "react-hook-form"
import * as style from "@/shared/css/pages/MessagesInside.module.scss"
import TextField from "@mui/material/TextField"
import MicIcon from '@mui/icons-material/Mic';
import { sxStyle } from "@/shared/ui/kit/CircleButton";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import Paper from "@mui/material/Paper";
import AddFiles from "@/pages/Messages/InsideMessage/widget/modules/components/kit/AddFiles";
import ButtonLocal, { sxMinButton } from "@/pages/Messages/InsideMessage/widget/modules/components/kit/ButtonLocal";

function SentBody({onSubmit, register}: {onSubmit: SubmitHandler<any>, register: UseFormRegister<any>}) {

  // return <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column", width: "300px"}}>
  return <Paper component="form" onSubmit={onSubmit} className={style.section__form}>

    <AddFiles register={register("files")} />
    
    <TextField {...register('text')} label={"Сообщение"} variant="outlined" sx={{flex: 1}} />

    <ButtonLocal variant="outlined" color="inherit"><MicIcon sx={sxStyle} /></ButtonLocal>
    <ButtonLocal variant="outlined" color="primary" type="submit"><SendIcon sx={sxStyle} /></ButtonLocal>

  </Paper>
}

export default SentBody

  // return <form onSubmit={onSubmit} className={style.section__form}>
  //   <div>Отправить сообщение</div>
  //   <label htmlFor="text">Текст</label>
  //   <input {...register('text')} type="text" defaultValue={"text test"} id="text" />
  //   <label htmlFor="files">Файлы</label>
  //   <input {...register("files")} type="file" multiple id="files" />
  //   <button>Отпраивть</button>
  // </form>