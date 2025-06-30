import {convertToResolution, guesType } from "@/pages/Messages/InsideMessage/func/FileFunctions";
import StoreModalFile from "@/shared/ui/components/modal/StoreModalFile";
import CardMedia from "@mui/material/CardMedia";
import * as style from "@/shared/css/modules/CreatePost.module.scss"

interface propsInterface {
	fileLink: string;
}

function FileToCardMedia({ fileLink }: propsInterface) {
	const type = convertToResolution(fileLink);
	const gues = guesType(type);

	const handleOpen = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		StoreModalFile.setFile(fileLink);
		StoreModalFile.openModal();
	};

	return (
		<>
			{gues === "img" && (
				<CardMedia
					component={gues}
					onClick={handleOpen}
					src={fileLink}
					className={style["form__cardContent--cardMedia"]}
				/>
			)}
			{gues === "audio" && (
				<audio
					// component={gues}
					src={fileLink}
					controls
					className={style["form__cardContent--cardMedia"]}
				/>
			)}
			{gues === "video" && (
				<CardMedia
					component={gues}
					onClick={handleOpen}
					src={fileLink}
					className={style["form__cardContent--cardMedia"]}
				/>
			)}
		</>
	);
}

export default FileToCardMedia;
