import AddFiles from "@/pages/Messages/InsideMessage/widget/Main/modules/components/kit/AddFiles";
import { PostsDTOClientSchema } from "@/pages/Profile/Posts/validation/Schemas";
import StorePosts from "@/pages/Profile/stores/Store-Posts";
import StoreUser from "@/shared/stores/Store-User";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import * as style from "@/shared/css/modules/CreatePost.module.scss"
import Button from "@mui/material/Button";

function CreatePost() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(PostsDTOClientSchema), defaultValues: {userid: StoreUser.user?.id} });

	const onSubmit = handleSubmit(data => {
		StorePosts.post(data)
	});

	return (
		<>
			<Paper component={"form"} onSubmit={onSubmit} className={style.form__createPost}>
				<AddFiles register={register("files")} />
				<TextField {...register('text')} label={"Текст"} variant="outlined" sx={{flex: 1}} />
				<Button variant="contained" type="submit">Готово</Button>
			</Paper>
      {/* <button onClick={() => console.log(errors)}>Errors</button> */}
		</>
	);
}

export default CreatePost;
