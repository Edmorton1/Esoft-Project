import UsersCardInfo from "@app/client/shared/ui/components/UsersCardInfo";
import { UsersContext } from "@app/client/pages/Users/widgets/Card/UsersCardWidget";
import StoreForm from "@app/client/shared/stores/Store-Form";
import StoreLikes from "@app/client/shared/stores/Likes/StoreLikes";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import TimeoutButton from "@app/client/shared/ui/mui_components/TimeoutButton";

function UsersCardModule() {
	const context = useContext(UsersContext)!;
	const liked = StoreLikes.likes?.sent.some(e => e.liked_userid === context!.id);

	const handleLike = () =>
		StoreLikes.likes?.sent.some(e => e.liked_userid === context!.id)
			? StoreLikes.delete(context)
			: StoreLikes.like(context);

	return (
		<UsersCardInfo form={context}>
			{StoreForm.form && StoreForm.form?.id !== context.id && (
				<TimeoutButton color={liked ? "error" : "success"} variant="contained" onClick={handleLike}>
					{liked ? "Убрать лайк" : "Лайкнуть"}
				</TimeoutButton>
			)}
		</UsersCardInfo>
	);
}

export default observer(UsersCardModule);

{
	/* <button onClick={() => console.log(toJS(StoreLikes.likes))}>SHOW LIKES</button> */
}

{
	/* {!StoreLikes.likes?.sent.map(e => e.liked_userid).includes(anUser.id)
    ? !(anUser.id === StoreForm.form?.id) && <button onClick={() => StoreLikes.sendLike({userid: StoreForm.form!.id, liked_userid: anUser.id})}>Лайкнуть</button>
    : StoreForm?.form && <button onClick={() => StoreLikes.delete(anUser.id)}>Убрать лайк</button>} */
}
