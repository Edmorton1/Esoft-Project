import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import * as style from "@app/client/shared/css/components/UserCard.module.scss";
import Divider from "@mui/material/Divider";
import { ReactNode } from "react";
import ReadMore from "@app/client/shared/ui/mui_module_components/ReadMore";
import { Form, Tags } from "@app/types/gen/Users";
import { BG_ALT } from "@app/shared/COLORS";
import { paths } from "@app/shared/PATHS";
import AvatarImg from "@app/client/shared/ui/mui_components/AvatarImg";
import { Link } from "react-router-dom";
import { translateTarget } from "@app/client/shared/funcs/translatetTarget";
import InfoField from "@app/client/shared/ui/components/InfoField";
import StoreUser from "@app/client/shared/stores/Store-User";

function UsersCardInfo({ form, children }: { form: Form; children?: ReactNode }) {
	// console.log("TAGS", toJS(form.tags))
	const url = `${paths.profile}/${form.id}`;
	const filtredTags = form.tags?.filter(e => e.tag);

	return (
		<Card component={"article"} className={style.container}>
			{/* <Avatar src={form.avatar!} className={style.container__avatar} /> */}
			<Link to={url}>
				<Box sx={{ padding: "12px", height: "350px" }}>
					<AvatarImg src={form.avatar} className={style.container__avatar} />
				</Box>
			</Link>

			<CardContent sx={{ bgcolor: BG_ALT }} className={style.container__content}>
				<Divider />
				<InfoField row="Имя" value={form.name} />
				<Divider />
				<InfoField row="Пол" value={form.sex === true ? "Мужчина" : "Женщина"} />
				<Divider />
				<InfoField row="Возраст" value={form.age} />
				<Divider />
				<InfoField row="Цель" value={translateTarget(form.target)} />
				<Divider />
				{form.description && (
					<>
						<InfoField row="Описание" value={<ReadMore component={form.description} len={110} />} />
						<Divider />
					</>
				)}
				<InfoField row="Город" value={form.city} />
				<Divider />
				{filtredTags && filtredTags?.length > 0 && (
					<>
						<Typography>
							<strong>Тэги: </strong>
						</Typography>

						<ReadMore
							component={form.tags}
							len={4}
							RenderWrap={({ children }) => <Box sx={{ bgcolor: BG_ALT }}>{children}</Box>}
							renderItem={(e: Tags) => <Chip variant="outlined" key={e.tag} label={e.tag} />}
						/>
						<Divider />
					</>
				)}

				{form.distance && form.id !== StoreUser.user?.id && (
					<Typography>
						<strong>Расстояние: </strong>
						{form.distance} км
					</Typography>
				)}
				{children}
			</CardContent>
			{/* <img src={form.avatar!} alt="" /> */}
		</Card>
	);
}

export default observer(UsersCardInfo);
