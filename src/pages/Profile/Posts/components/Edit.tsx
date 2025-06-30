import AddFiles from "@/pages/Messages/InsideMessage/widget/Main/modules/components/kit/AddFiles";
import FileToCardMedia from "@/pages/Profile/Posts/components/FileToCardMedia";
import { PostsDTOPutClientSchema } from "@/pages/Profile/Posts/validation/Schemas";
import StorePosts from "@/pages/Profile/stores/Store-Posts";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Posts } from "@t/gen/Users";
import { useForm, useWatch } from "react-hook-form";
import * as style from "@/shared/css/modules/CreatePost.module.scss"
import Paper from "@mui/material/Paper";

interface propsInterface {
	post: Posts;
  handleSuccess: () => void;
}

function Edit({ post, handleSuccess }: propsInterface) {
  const {register, handleSubmit, formState: {errors}, setValue, control } = useForm({resolver: zodResolver(PostsDTOPutClientSchema), defaultValues: {text: post.text, userid: post.userid, remove_old: [], id: post.id}})

  const remove_old = useWatch({name: "remove_old", control})
  // const text = useWatch({name: "text", control})

  const onSubmit = (handleSubmit(data => {
    StorePosts.put(data)
    handleSuccess()
  }))

	return <>
    <Paper component={"form"} onSubmit={onSubmit}>
      <div className={style.form__editPost}>
				<AddFiles register={register("files")} />
				<TextField {...register('text')} label={"Текст"} variant="outlined" sx={{flex: 1}} />
      </div>
      <div className={style.form__deleteFiles}>
        {post.files.filter(e => !remove_old.includes(e)).map(link => {
          const handleDeleteFile = () => {
            setValue("remove_old", [...remove_old, link])
          }

          return <div key={link} className={style['form__deleteFiles--cardButton']}>
            <FileToCardMedia fileLink={link} />
            <Button variant="contained" color="error" onClick={handleDeleteFile}>Удалить</Button>
          </div>
        })}
      </div>
      
      {/* <input {...register("files")} type="file" multiple />
      <input {...register("text")} type="text" defaultValue={text} /> */}
      <Button type="submit" variant="contained" sx={{width: "100%"}}>Сохранить</Button>
      <Button variant="contained" sx={{width: "100%", marginTop: 1}} onClick={handleSuccess}>Отменить</Button>
    </Paper>
    {/* <button onClick={() => console.log(errors)}>Errors</button> */}
  </>
}

export default Edit;
