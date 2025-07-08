import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import MapIcon from "@mui/icons-material/Map";
import DomainIcon from "@mui/icons-material/Domain";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { paths } from "@app/shared/PATHS";
import { ReactNode } from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SettingsIcon from '@mui/icons-material/Settings';
import * as style from "@app/client/shared/css/modules/Main.module.scss"
import Box from "@mui/material/Box";
import { BG_PAPER } from "@app/shared/COLORS";
import StoreUser from "@app/client/shared/stores/Store-User";
import HomeIcon from '@mui/icons-material/Home';
import Typography from "@mui/material/Typography";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StoreExit from "@app/client/shared/ui/modals/Exit/Store-Exit";

const sxBut = {textTransform: "none", width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px"}

function SidebarNav() {
	const HeadButton = ({
		isActive,
		children,
	}: {
		isActive: boolean;
		children: ReactNode;
	}) => (
		<Button color={"inherit"} variant={isActive ? "contained" : "outlined"} sx={sxBut}>
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
  <Box component={"aside"} className={style.main__slidebar} bgcolor={BG_PAPER}>
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

    {StoreUser.user && <NavButton to={paths.liked}>
      <ThumbUpIcon />
      <Typography>Лайки</Typography>
    </NavButton>}

    {StoreUser.user && <NavButton to={paths.pairs}>
      <FavoriteIcon />
      <Typography>Пары</Typography>
    </NavButton>}

    <NavButton to={paths.users}>
      <GroupIcon />
      <Typography>Пользователи</Typography>
    </NavButton>

    {StoreUser.user && <NavButton to={paths.map}>
      <MapIcon />
      <Typography>Карта</Typography>
    </NavButton>}

    {StoreUser.user && <NavButton to={paths.settings}>
      <SettingsIcon />
      <Typography>Настройки</Typography>
    </NavButton>}

    {StoreUser.user && <Button variant="outlined" color="inherit" sx={sxBut} onClick={() => StoreExit.openModal()}>
      <ExitToAppIcon />
      <Typography>Выйти</Typography>
    </Button>}
    
  </Box>
);
}

export default SidebarNav;
