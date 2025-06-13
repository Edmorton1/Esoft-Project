import Box from "@mui/material/Box";
import { ReactNode } from "react";
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';

type resolutions = 'ogg' | 'webp' | 'mp4'
type types = 'img' | 'audio' | 'video'
const sxStyle = {width: 100, height: 100}
// export type MouseEventType = React.MouseEvent<HTMLImageElement, MouseEvent>

interface propsInterface {
	fileLink: string,
	mode?: "mini" | "full"
	children?: ReactNode,
	// onMouseEnter?: (e: MouseEventType) => void,
	// onMouseLeave?: (e: MouseEventType) => void,
}

function guesType(type: resolutions): types {
	if (type === 'ogg') return 'audio'
	if (type === 'mp4') return 'video'
	return 'img'
}

function FileComponent({fileLink, children, mode = "full"}: propsInterface) {
	const type = fileLink.split(".").splice(-1)[0] as resolutions;
	const gues = guesType(type)

	console.log(type);

	if (mode === 'mini') {
		return <>
			{children}
			{gues === "img" && <Box component={gues} src={fileLink} />}
			{gues === "audio" && <AudioFileIcon sx={sxStyle} />}
			{gues === "video" && <VideoFileIcon sx={sxStyle} />}
		</>
	}

	return <>
		<Box component={gues} src={fileLink} controls></Box>
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