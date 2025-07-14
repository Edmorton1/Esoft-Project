import AddFiles from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/components/kit/AddFiles";
import StoreUser from "@app/client/shared/stores/Store-User";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import * as style from "@app/client/shared/css/modules/CreatePost.module.scss";
import usePostsStore from "@app/client/pages/Profile/widgets/Posts/hooks/usePostsStore";
import { PostsDTOClientSchema } from "@app/client/pages/Profile/widgets/Posts/validation/Schemas";
import TimeoutButton from "@app/client/shared/ui/mui_components/TimeoutButton";

function CreatePost() {
	const { register, handleSubmit, reset } = useForm({
		resolver: zodResolver(PostsDTOClientSchema),
		defaultValues: { userid: StoreUser.user?.id },
	});

	const store = usePostsStore();

	const onSubmit = handleSubmit(data => {
		reset();
		store.post(data);
	});

	return (
		<>
			<Paper component={"form"} onSubmit={onSubmit} className={style.form__createPost}>
				<AddFiles register={register("files")} />
				<TextField {...register("text")} label={"Текст"} variant="outlined" sx={{ flex: 1 }} />
				<TimeoutButton variant="contained" type="submit">
					Готово
				</TimeoutButton>
			</Paper>
			{/* <button onClick={() => console.log(errors)}>Errors</button> */}
		</>
	);
}

export default CreatePost;
