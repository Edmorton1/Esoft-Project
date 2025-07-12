import StoreProfile from "@app/client/pages/Profile/stores/Store-Profile";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReadMore from "@app/client/shared/ui/mui_module_components/ReadMore";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import * as style from "@app/client/shared/css/pages/Profile.module.scss"
import LastActive from "@app/client/shared/ui/mui_module_components/LastActive";
import usePostsStore from "@app/client/pages/Profile/widgets/Posts/hooks/usePostsStore";
import Avatar from "@mui/material/Avatar";
import StoreUser from "@app/client/shared/stores/Store-User";
import { observer } from "mobx-react-lite";

// ПОТОМ СДЕЛАТЬ С ИНФОРМАЦИЕЙ КАК МОДАЛКУ
function UserInfo() {
	const profile = StoreProfile.profile;
	const filtredTags = StoreProfile.profile?.tags?.filter(e => e.tag)
	console.log("filtredTags", profile)
	const store = usePostsStore()
	const wh = "300px"

	// console.log("АЙДИШНИКИ", StoreUser.user?.id, store.profileid, StoreUser.user?.id === store.profileid)

	if (!profile) return null;

	return (
		<Paper
      component={"div"}
      className={style.info}>
      
			<Avatar src={profile.avatar} sx={{width: wh, height: wh}} />

			<Box sx={{ flex: 1 }}>
				<Stack spacing={1.5}>
					<LastActive last_active={profile.last_active} />
					<Typography>
						<strong>Пол:</strong> {profile.sex ? "Мужчина" : "Женщина"}
					</Typography>
					<Typography>
						<strong>Возраст:</strong> {profile.age}
					</Typography>
					<Typography>
						<strong>Город:</strong> {profile.city}
					</Typography>
					<Typography>
						<strong>Цель:</strong> {profile.target}
					</Typography>

					{profile.description && (
						<Typography>
							<strong>Описание:</strong>{" "}
							<ReadMore component={profile.description} len={110} />
						</Typography>
					)}

					{profile.distance && StoreUser.user?.id !== store.profileid && <Typography>
						<strong>Дистанция:</strong> {profile.distance} км
					</Typography>}

					{filtredTags && filtredTags.length > 0 && (
						<Box>
							<Typography>
								<strong>Теги:</strong>
							</Typography>
							<Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
								{filtredTags.map(tag => (
									<Chip key={tag.tag} label={tag.tag} variant="outlined" sx={{height: 40, padding: '0 12px'}} />
								))}
							</Stack>
						</Box>
					)}
				</Stack>
			</Box>
		</Paper>
	);
}

export default observer(UserInfo);
