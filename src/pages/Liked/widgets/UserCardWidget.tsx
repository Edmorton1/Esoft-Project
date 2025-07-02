import UsersCardInfo from "@/shared/ui/components/UsersCardInfo"
import StoreLikes from "@/shared/stores/StoreLikes"
import * as style from "@/shared/css/pages/Liked.module.scss"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import StorePairs from "@/shared/stores/Store-Pairs"
import { Form } from "@t/gen/Users"

function UserCardWidget({data}: {data: Form}) {
	const resolveHandle = () => StoreLikes.like(data);
	const rejectHandle = () => StorePairs.rejectUser(data.id);

	return (
		<UsersCardInfo formRaw={data} key={data.id}>
			<Paper className={style["container__cards--actions"]}>
				{/* <Link to={`${paths.messages}/${e.id}`}><Button sx={{width: "100%"}} variant="contained">Написать</Button></Link> */}
				{/* <Button variant="contained" color="success" onClick={() => StoreLikes.sendLike(e.id)}>{StoreLikes.likes?.sent.find(item => item.liked_userid === e.id) ? 'Убрать лайк' : "Лайкнуть"}</Button> */}
				<p>
					{StoreLikes.likes?.sent.find(item => item.liked_userid === data.id)
						? "ТЫ ЕГО ЛАЙКНУЛ"
						: "НЕ ЛАЙКАЛ"}
				</p>
				<Button variant="contained" color="success" onClick={resolveHandle}>
					Одобрить
				</Button>
				<Button color="error" variant="contained" onClick={rejectHandle}>
					Отклонить
				</Button>
			</Paper>
		</UsersCardInfo>
	);
}

export default UserCardWidget;
