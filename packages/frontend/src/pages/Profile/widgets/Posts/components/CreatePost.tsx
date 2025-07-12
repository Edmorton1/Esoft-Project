import AddFiles from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/components/kit/AddFiles";
import StoreUser from "@app/client/shared/stores/Store-User";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import * as style from "@app/client/shared/css/modules/CreatePost.module.scss"
import Button from "@mui/material/Button";
import usePostsStore from "@app/client/pages/Profile/widgets/Posts/hooks/usePostsStore";
import { PostsDTOClientSchema } from "@app/client/pages/Profile/widgets/Posts/validation/Schemas";

function CreatePost() {
	const {
		register,
		handleSubmit,
		reset,
	} = useForm({ resolver: zodResolver(PostsDTOClientSchema), defaultValues: {userid: StoreUser.user?.id} });

	const store = usePostsStore()

	const onSubmit = handleSubmit(data => {
		reset()
		store.post(data)
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
