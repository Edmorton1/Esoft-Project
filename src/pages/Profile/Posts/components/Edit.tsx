import { PostsDTOPutClientSchema } from "@/pages/Profile/Posts/validation/Schemas";
import StorePosts from "@/pages/Profile/stores/Store-Posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Posts } from "@t/gen/Users";
import { useForm, useWatch } from "react-hook-form";

interface propsInterface {
	post: Posts;
  handleSuccess: () => void
}

function Edit({ post, handleSuccess }: propsInterface) {
  const {register, handleSubmit, formState: {errors}, setValue, control } = useForm({resolver: zodResolver(PostsDTOPutClientSchema), defaultValues: {text: post.text, userid: post.userid, remove_old: [], id: post.id}})

  const remove_old = useWatch({name: "remove_old", control})
  const text = useWatch({name: "text", control})

  const onSubmit = (handleSubmit(data => {
    StorePosts.put(data)
    handleSuccess()
  }))

	return <>
    <form onSubmit={onSubmit} style={{backgroundColor: "red"}}>
      <p>Файлы</p>
      {post.files.filter(e => !remove_old.includes(e)).map(link => {
        const handleDeleteFile = () => {
          setValue("remove_old", [...remove_old, link])
        }

        return <div key={link}>
          <p>{link}</p>
          <button onClick={handleDeleteFile}>Удалить</button>
        </div>
      })}
      <input {...register("files")} type="file" multiple />
      <input {...register("text")} type="text" defaultValue={text} />
      <button>Готово</button>
    </form>;
    <button onClick={() => console.log(errors)}>Errors</button>
  </>
}

export default Edit;
