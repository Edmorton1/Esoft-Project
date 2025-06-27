import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ChatIcon from "@mui/icons-material/Chat";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InterestsIcon from "@mui/icons-material/Interests";
import PlaceIcon from "@mui/icons-material/Place";
import MessageIcon from "@mui/icons-material/Message";
import CallIcon from "@mui/icons-material/Call";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import MapIcon from "@mui/icons-material/Map";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExploreIcon from "@mui/icons-material/Explore";
import SecurityIcon from "@mui/icons-material/Security";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SettingsIcon from "@mui/icons-material/Settings";
import BrushIcon from "@mui/icons-material/Brush";
import { ReactElement } from "react";

export interface ICard {
  icon: ReactElement;
  title: string;
  items: { icon: ReactElement; text: string }[];
};

const FONT_SIZE_LARGE = "large";
const FONT_SIZE_SMALL = "medium";

const cards: ICard[] = [
	{
		icon: <PersonSearchIcon fontSize={FONT_SIZE_LARGE} />,
		title: "Поиск людей",
		items: [
			{
				icon: <InterestsIcon fontSize={FONT_SIZE_SMALL} />,
				text: "По интересам",
			},
			{
				icon: <PlaceIcon fontSize={FONT_SIZE_SMALL} />,
				text: "По дистанции",
			},
		],
	},
	{
		icon: <ChatIcon fontSize={FONT_SIZE_LARGE} />,
		title: "Мессенджер",
		items: [
			{
				icon: <MessageIcon fontSize={FONT_SIZE_SMALL} />,
				text: "Писать сообщения",
			},
			{
				icon: <CallIcon fontSize={FONT_SIZE_SMALL} />,
				text: "Аудио и видео звонки",
			},
			{
				icon: <PhotoLibraryIcon fontSize={FONT_SIZE_SMALL} />,
				text: "Обмениваться фото, аудио, видео файлами",
			},
		],
	},
	{
		icon: <AutoAwesomeIcon fontSize={FONT_SIZE_LARGE} />,
		title: "Фишки сайта",
		items: [
			{
				icon: <FilterAltIcon fontSize={FONT_SIZE_SMALL} />,
				text: "Удобная фильтрация и сортировка",
			},
			{
				icon: <SearchIcon fontSize={FONT_SIZE_SMALL} />,
				text: "Поиск по имени",
			},
			{
				icon: <MapIcon fontSize={FONT_SIZE_SMALL} />,
				text: "Карта пользователей",
			},
			{
				icon: <FavoriteIcon fontSize={FONT_SIZE_SMALL} />,
				text: "Система лайков и пар",
			},
			{
				icon: <ExploreIcon fontSize={FONT_SIZE_SMALL} />,
				text: "Искать самому, не полагаясь на алгоритмы",
			},
		],
	},
	{
		icon: <SecurityIcon fontSize={FONT_SIZE_LARGE} color="inherit" />,
		title: "Безопасность",
		items: [
			{
				icon: <VpnKeyIcon />,
				text: "Надёжная система аутентификации",
			},
		],
	},
	{
		icon: <SettingsIcon fontSize={FONT_SIZE_LARGE} color="inherit" />,
		title: "Персонализация",
		items: [
			{
				icon: <BrushIcon />,
				text: "Большой функционал в настройке профиля",
			},
		],
	},
];

export default cards