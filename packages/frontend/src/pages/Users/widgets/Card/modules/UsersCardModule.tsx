import UsersCardInfo from "@app/client/shared/ui/components/UsersCardInfo";
import StoreForm from "@app/client/shared/stores/Store-Form";
import { observer } from "mobx-react-lite";
import { Form } from "@app/types/gen/Users";
import SendLikeButton from "@app/client/shared/ui/modules/SendLikeButton/SendLikeButton";

function UsersCardModule({form}: {form: Form}) {
	console.log("UsersCardModule RERENDER")


	return (
		<UsersCardInfo form={form}>
			{StoreForm.form && StoreForm.form?.id !== form.id && (
				<SendLikeButton userForm={form} />
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
