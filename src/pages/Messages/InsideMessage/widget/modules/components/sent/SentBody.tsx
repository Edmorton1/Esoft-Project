import { SubmitHandler, UseFormRegister } from "react-hook-form"
import * as style from "@/shared/css/pages/MessagesInside.module.scss"
import TextField from "@mui/material/TextField"
import MicIcon from '@mui/icons-material/Mic';
import { sxStyle } from "@/shared/ui/kit/CircleButton";
import SendIcon from '@mui/icons-material/Send';
import Paper from "@mui/material/Paper";
import AddFiles from "@/pages/Messages/InsideMessage/widget/modules/components/kit/AddFiles";
import ButtonLocal from "@/pages/Messages/InsideMessage/widget/modules/components/kit/ButtonLocal";
import VoiceMessage from "@/pages/Messages/InsideMessage/widget/modules/classes/VoiceMessage";
import { useState } from "react";

function SentBody({onSubmit, register, toid}: {onSubmit: SubmitHandler<any>, register: UseFormRegister<any>, toid: number}) {

  const [mediaInstance, setMediaInstance] = useState<VoiceMessage | null>(null)
  const [record, setRecord] = useState(false)

  const onStartRead = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true})
      const vm = new VoiceMessage(stream, toid)
      setMediaInstance(vm)
      setRecord(true)
      vm.start()
    } catch {
      console.error("[AUDIO]: НЕТ МИКРОФОНА")
    }
  }

  const onStopRead = () => {mediaInstance?.stop(); setMediaInstance(null); setRecord(false)}

  return <Paper component="form" onSubmit={onSubmit} className={style.section__form}>

    <AddFiles register={register("files")} />
    
    <TextField {...register('text')} label={"Сообщение"} variant="outlined" sx={{flex: 1}} />

    <ButtonLocal variant="outlined" color={record ? 'primary' : 'inherit'} onClick={record ? onStopRead : onStartRead}><MicIcon sx={sxStyle} /></ButtonLocal>
    <ButtonLocal disabled={record} variant="outlined" color="primary" type="submit"><SendIcon sx={sxStyle} /></ButtonLocal>

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