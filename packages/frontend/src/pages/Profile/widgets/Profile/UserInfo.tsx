import StoreProfile from "@app/client/pages/Profile/stores/Store-Profile";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReadMore from "@app/client/shared/ui/mui_module_components/ReadMore";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import * as style from "@app/client/shared/css/pages/Profile.module.scss";
import LastActive from "@app/client/shared/ui/mui_module_components/LastActive";
import usePostsStore from "@app/client/pages/Profile/widgets/Posts/hooks/usePostsStore";
import Avatar from "@mui/material/Avatar";
import StoreUser from "@app/client/shared/stores/Store-User";
import { observer } from "mobx-react-lite";
import InfoField from "@app/client/shared/ui/components/InfoField";
import { translateTarget } from "@app/client/shared/funcs/translatetTarget";
import StoreModalFile from "@app/client/shared/ui/modals/Files/StoreModalFile";
import SendLikeButton from "@app/client/shared/ui/modules/SendLikeButton/SendLikeButton";

// ПОТОМ СДЕЛАТЬ С ИНФОРМАЦИЕЙ КАК МОДАЛКУ
function UserInfo() {
	const profile = StoreProfile.profile;
	const filtredTags = StoreProfile.profile?.tags?.filter(e => e.tag);
	console.log("filtredTags", profile);
	const store = usePostsStore();
	const wh = "300px";

	// console.log("АЙДИШНИКИ", StoreUser.user?.id, store.profileid, StoreUser.user?.id === store.profileid)

	if (!profile) return null;

	const openAvatar = () => {
		if (profile.avatar) {
			StoreModalFile.setFile(profile.avatar!);
			StoreModalFile.openModal();
		}
	};

	return (
		<Paper component={"div"} className={style.info}>
			<div>
				<Avatar
					component={"div"}
					onClick={openAvatar}
					src={profile.avatar}
					sx={{ width: wh, height: wh }}
				/>
				{StoreUser.user?.id !== profile.id && <SendLikeButton sx={{width: "100%"}} userForm={profile} />}
			</div>

			<Box sx={{ flex: 1 }}>
				<Stack spacing={1.5}>
					<LastActive last_active={profile.last_active} />
					<InfoField row="Пол" value={profile.sex ? "Мужчина" : "Женщина"} />
					<InfoField row="Возраст" value={profile.age} />
					<InfoField row="Город" value={profile.city} />
					<InfoField row="Цель" value={translateTarget(profile.target)} />

					{profile.description && (
						<InfoField
							row="Описание"
							value={<ReadMore component={profile.description} len={60} />}
						/>
					)}

					{profile.distance && StoreUser.user?.id !== store.profileid && (
						<InfoField row="Дистанция" value={`${profile.distance} км`} />
					)}

					{filtredTags && filtredTags.length > 0 && (
						<Box>
							<Typography>
								<strong>Теги:</strong>
							</Typography>
							<Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
								{filtredTags.map(tag => (
									<Chip
										key={tag.tag}
										label={tag.tag}
										variant="outlined"
										sx={{ height: 40, padding: "0 12px" }}
									/>
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
