import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import MapIcon from "@mui/icons-material/Map";
import DomainIcon from "@mui/icons-material/Domain";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { paths } from "@shared/PATHS";
import { ReactNode } from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SettingsIcon from '@mui/icons-material/Settings';
import * as style from "@/shared/css/modules/SidebarNav.module.scss"
import Box from "@mui/material/Box";
import { BG_PAPER } from "@shared/COLORS";

function SidebarNav() {
	const HeadButton = ({
		isActive,
		children,
	}: {
		isActive: boolean;
		children: ReactNode;
	}) => (
		<Button color={"salmon"} variant={isActive ? "contained" : "outlined"} sx={{width: "100%"}}>
			{children}
		</Button>
	);

	const NavButton = ({ to, children }: { to: string; children: ReactNode }) => (
		<NavLink to={to}>
			{({ isActive }) => (
				<HeadButton isActive={isActive}>{children}</HeadButton>
			)}
		</NavLink>
	);

	return <Box className={style.main} bgcolor={BG_PAPER}>
			<NavButton to={"/"}>
				Главная <DomainIcon />
			</NavButton>
			<NavButton to={paths.registration}>
				Регистрация <AppRegistrationIcon />
			</NavButton>
			<NavButton to={paths.messages}>
				Сообщения <ForumIcon />
			</NavButton>
			<NavButton to={paths.users}>
				Пользователи <GroupIcon />
			</NavButton>
			<NavButton to={paths.map}>
				MAP <MapIcon />
			</NavButton>
			<NavButton to={paths.liked}>
				Liked <ThumbUpIcon />
			</NavButton>
			<NavButton to={paths.pairs}>
				Пары <FavoriteIcon />
			</NavButton>
			<NavButton to={paths.settings}>
				Настройки <SettingsIcon />
			</NavButton>
		</Box>
}

export default SidebarNav;
