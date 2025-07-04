import StoreProfile from "@app/client/pages/Profile/stores/Store-Profile";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReadMore from "@app/client/shared/ui/mui_module_components/ReadMore";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import * as style from "@app/client/shared/css/pages/Profile.module.scss"
import { BG_ALT, BG_PAPER } from "@app/shared/COLORS";
import StorePostsAuthor from "@app/client/pages/Profile/stores/Store-Posts";
import LastActive from "@app/client/shared/ui/mui_module_components/LastActive";
import usePostsStore from "@app/client/pages/Profile/widgets/Posts/hooks/usePostsStore";

const sxFont = {fontSize: "20px"}

// ПОТОМ СДЕЛАТЬ С ИНФОРМАЦИЕЙ КАК МОДАЛКУ
function UserInfo() {
	const profile = StoreProfile.profile;
	const filtredTags = StoreProfile.profile?.tags?.filter(e => e.tag)
	console.log("filtredTags", profile)
	const store = usePostsStore()

	if (!profile) return null;

	return (
		<Paper
      component={"div"}
      className={style.container__info}>
      
			<Box component={"img"} src={profile.avatar} alt="" sx={{maxHeight: "500px", objectFit: "contain", bgcolor: BG_PAPER}} />

			<Box sx={{ flex: 1 }}>
				<Stack spacing={1.5}>
					<LastActive last_active={profile.last_active} />
					<Typography sx={sxFont}>
						<strong>Пол:</strong> {profile.sex ? "Мужчина" : "Женщина"}
					</Typography>
					<Typography sx={sxFont}>
						<strong>Возраст:</strong> {profile.age}
					</Typography>
					<Typography sx={sxFont}>
						<strong>Город:</strong> {profile.city}
					</Typography>
					<Typography sx={sxFont}>
						<strong>Цель:</strong> {profile.target}
					</Typography>

					{profile.description && (
						<Typography sx={sxFont}>
							<strong>Описание:</strong>{" "}
							<ReadMore component={profile.description} len={110} />
						</Typography>
					)}

					{profile.distance && !store.canChange && <Typography sx={sxFont}>
						<strong>Дистанция:</strong> {profile.distance} км
					</Typography>}

					{filtredTags && filtredTags.length > 0 && (
						<Box>
							<Typography sx={sxFont}>
								<strong>Теги:</strong>
							</Typography>
							<Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
								{filtredTags.map(tag => (
									<Chip key={tag.tag} label={tag.tag} variant="outlined" sx={{fontSize: '17px', height: 40, padding: '0 12px'}} />
								))}
							</Stack>
						</Box>
					)}
				</Stack>
			</Box>
		</Paper>
	);
}

export default UserInfo;
