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
import StoreUser from "@/shared/stores/Store-User";
import HomeIcon from '@mui/icons-material/Home';
import Typography from "@mui/material/Typography";

function SidebarNav() {
	const HeadButton = ({
		isActive,
		children,
	}: {
		isActive: boolean;
		children: ReactNode;
	}) => (
		<Button color={"inherit"} variant={isActive ? "contained" : "outlined"} sx={{textTransform: "none", width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px"}}>
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

return (
  <Box className={style.main} bgcolor={BG_PAPER}>
    {StoreUser.user ? (
      <NavButton to={`${paths.profile}/${StoreUser.user.id}`}>
        <HomeIcon />
        <Typography>Мой профиль</Typography>
      </NavButton>
    ) : (
      <NavButton to={"/"}>
        <DomainIcon />
        <Typography>Главная</Typography>
      </NavButton>
    )}

    {!StoreUser.user &&<NavButton to={paths.registration}>
      <AppRegistrationIcon />
      <Typography>Регистрация</Typography>
    </NavButton>}

    {StoreUser.user && <NavButton to={paths.messages}>
      <ForumIcon />
      <Typography>Сообщения</Typography>
    </NavButton>}

    <NavButton to={paths.users}>
      <GroupIcon />
      <Typography>Пользователи</Typography>
    </NavButton>

    <NavButton to={paths.map}>
      <MapIcon />
      <Typography>Карта</Typography>
    </NavButton>

    {StoreUser.user && <NavButton to={paths.liked}>
      <ThumbUpIcon />
      <Typography>Лайки</Typography>
    </NavButton>}

    {StoreUser.user && <NavButton to={paths.pairs}>
      <FavoriteIcon />
      <Typography>Пары</Typography>
    </NavButton>}

    {StoreUser.user && <NavButton to={paths.settings}>
      <SettingsIcon />
      <Typography>Настройки</Typography>
    </NavButton>}
  </Box>
);
}

export default SidebarNav;
