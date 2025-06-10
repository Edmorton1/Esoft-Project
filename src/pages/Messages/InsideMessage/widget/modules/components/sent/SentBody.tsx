import { SubmitHandler, UseFormRegister } from "react-hook-form"

function SentBody({onSubmit, register}: {onSubmit: SubmitHandler<any>, register: UseFormRegister<any>}) {


  // return <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column", width: "300px"}}>
  return <form onSubmit={onSubmit}>
    <div>Отправить сообщение</div>
    <label htmlFor="text">Текст</label>
    <input {...register('text')} type="text" defaultValue={"text test"} id="text" />
    <label htmlFor="files">Файлы</label>
    <input {...register("files")} type="file" multiple id="files" />
    <button>Отпраивть</button>
  </form>
}

export default SentBody