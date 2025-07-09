import AddFiles from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/components/kit/AddFiles";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Posts } from "@app/types/gen/Users";
import { useForm, useWatch } from "react-hook-form";
import * as style from "@app/client/shared/css/modules/CreatePost.module.scss"
import Paper from "@mui/material/Paper";
import usePostsStore from "@app/client/pages/Profile/widgets/Posts/hooks/usePostsStore";
import FileToCardMedia from "@app/client/pages/Profile/widgets/Posts/components/FileToCardMedia";
import { PostsDTOPutClientSchema } from "@app/client/pages/Profile/widgets/Posts/validation/Schemas";

interface propsInterface {
	post: Posts;
  EditToZero: () => void;
}

function Edit({ post, EditToZero: handleSuccess }: propsInterface) {
  const {register, handleSubmit, setValue, control } = useForm({resolver: zodResolver(PostsDTOPutClientSchema), defaultValues: {text: post.text, userid: post.userid, remove_old: [], id: post.id}})

  const remove_old = useWatch({name: "remove_old", control})
  const store = usePostsStore()
  // const text = useWatch({name: "text", control})

  const onSubmit = (handleSubmit(data => {
    store.put(data)
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
