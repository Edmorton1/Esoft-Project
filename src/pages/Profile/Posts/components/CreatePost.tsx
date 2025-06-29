import { PostsDTOClientSchema } from "@/pages/Profile/Posts/validation/Schemas";
import StorePosts from "@/pages/Profile/stores/Store-Posts";
import StoreUser from "@/shared/stores/Store-User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
			<form
				onSubmit={onSubmit}
				style={{ display: "flex", flexDirection: "column", width: "300px" }}>
				<input {...register("text")} type="text" />
				<input {...register("files")} type="file" multiple />
				<button>Готово</button>
			</form>
      <button onClick={() => console.log(errors)}>Errors</button>
		</>
	);
}

export default CreatePost;
