import StoreProfile from "@/pages/Profile/stores/Store-Profile";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReadMore from "@/shared/ui/components/ReadMore";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import * as style from "@/shared/css/pages/Profile.module.scss"
import { BG_ALT, BG_PAPER } from "@shared/COLORS";

const sxFont = {fontSize: "20px"}

// ПОТОМ СДЕЛАТЬ С ИНФОРМАЦИЕЙ КАК МОДАЛКУ
function UserInfo() {
	const profile = StoreProfile.profile;

	if (!profile) return null;

	return (
		<Paper
      component={"div"}
      className={style.container__info}>
      
			<Box component={"img"} src={profile.avatar} alt="" sx={{maxHeight: "500px", objectFit: "contain", bgcolor: BG_PAPER}} />

			<Box sx={{ flex: 1 }}>
				<Stack spacing={1.5}>

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

					{profile.tags?.length && (
						<Box>
							<Typography sx={sxFont}>
								<strong>Теги:</strong>
							</Typography>
							<Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
								{profile.tags.map(tag => (
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
