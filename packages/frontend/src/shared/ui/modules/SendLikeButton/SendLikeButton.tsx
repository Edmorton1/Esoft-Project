import StoreLikes from "@app/client/shared/stores/Likes/StoreLikes";
import TimeoutButton from "@app/client/shared/ui/mui_components/TimeoutButton";
import { Form } from "@app/types/gen/Users";
import { ButtonProps } from "@mui/material/Button";
import { observer } from "mobx-react-lite";

interface propsInterface extends Omit<Partial<ButtonProps>, "onClick"> {
	userForm: Form,
}

function SendLikeButton({userForm, ...props}: propsInterface) {
	const liked = StoreLikes.likes?.sent.some(e => e.liked_userid === userForm!.id);

	const handleLike = () =>
		StoreLikes.likes?.sent.some(e => e.liked_userid === userForm!.id)
			? StoreLikes.delete(userForm)
			: StoreLikes.like(userForm);

	return (
		<TimeoutButton color={liked ? "error" : "success"} variant="contained" onClick={handleLike} {...props}>
			{liked ? "Убрать лайк" : "Лайкнуть"}
		</TimeoutButton>
	);
}

export default observer(SendLikeButton);
