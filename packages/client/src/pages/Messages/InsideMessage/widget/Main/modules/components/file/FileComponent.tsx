import Box from "@mui/material/Box";
import { ReactNode } from "react";
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { convertToResolution, guesType } from "@/pages/Messages/InsideMessage/func/FileFunctions";
import StoreModalFile from "@/shared/ui/modals/Files/StoreModalFile";

const sxStyle = {width: 100, height: 100}

interface propsInterface {
	fileLink: string,
	mode?: "mini" | "full"
	children?: ReactNode,
}

function FileComponent({fileLink, children, mode = "full"}: propsInterface) {
	const type = convertToResolution(fileLink)
	const gues = guesType(type)

  const handleOpen = (e: any) => {e.preventDefault(); e.stopPropagation(); StoreModalFile.setFile(fileLink); StoreModalFile.openModal()};

	// console.log(type);

	if (mode === 'mini') {
		return <>
			{children}
			{gues === "img" && <Box component={gues} src={fileLink} />}
			{gues === "audio" && <AudioFileIcon sx={sxStyle} />}
			{gues === "video" && <VideoFileIcon sx={sxStyle} />}
		</>
	}

	return <>
		{gues === "img" && <img onClick={handleOpen} src={fileLink} alt="" />}
		{gues === "audio" && <audio src={fileLink} controls />}
		{gues === "video" && <video onClick={handleOpen} src={fileLink} />}
	</>
  
	
}

export default FileComponent;

	// switch (type) {
	// 	case "webp":
	// 		return <img src={fileLink} alt="" />;
	// 	case "mp4":
	// 		return <video controls src={fileLink}></video>;
	// 	case "ogg":
	// 		return <audio controls src={fileLink}></audio>;
	// }