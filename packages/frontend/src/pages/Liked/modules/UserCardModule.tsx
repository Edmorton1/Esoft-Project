import UsersCardInfo from "@app/client/shared/ui/components/UsersCardInfo"
import StoreLikes from "@app/client/shared/stores/StoreLikes"
import * as style from "@app/client/shared/css/pages/Liked.module.scss"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import { Form } from "@app/types/gen/Users"
import { memo } from "react"

function UserCardModule({data}: {data: Form}) {
	// console.log("РЕРЕНДЕР КАРТОЧКИ В ЛАЙКАХ", data.id)
	const resolveHandle = () => StoreLikes.like(data);
	const rejectHandle = () => StoreLikes.rejectUser(data.id);

	return (
		<UsersCardInfo form={data} key={data.id}>
			<Paper className={style["container__cards--actions"]}>
				{/* <Link to={`${paths.messages}/${e.id}`}><Button sx={{width: "100%"}} variant="contained">Написать</Button></Link> */}
				{/* <Button variant="contained" color="success" onClick={() => StoreLikes.sendLike(e.id)}>{StoreLikes.likes?.sent.find(item => item.liked_userid === e.id) ? 'Убрать лайк' : "Лайкнуть"}</Button> */}
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

export default memo(UserCardModule);
