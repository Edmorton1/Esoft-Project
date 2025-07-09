import StoreRoom from "@app/client/pages/Room/WebRTC/Store-Room";
import { observer } from "mobx-react-lite";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicOff from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CircleButton, { sxStyle } from "@app/client/shared/ui/mui_components/CircleButton";

const ThreeButtons = observer(() => {
	const handleAudioClick = () => {
		if (StoreRoom.audioEnebaled) {
			StoreRoom.disableAudio();
		} else StoreRoom.enableAudio();
	};

	const handleVideoClick = () => {
		if (StoreRoom.videoEnabled) {
			StoreRoom.disableVideo(true);
		} else StoreRoom.enableVideo(true);
	};

	const handleHangUp = () => StoreRoom.hangUp();

	return (
		<>
			<CircleButton onClick={handleAudioClick} variant="contained">
				{StoreRoom.audioEnebaled ? <MicOff sx={sxStyle} /> : <MicIcon sx={sxStyle} />}
			</CircleButton>

			<CircleButton onClick={handleVideoClick} variant="contained">
				{StoreRoom.videoEnabled ? <VideocamOffIcon sx={sxStyle} /> : <VideocamIcon sx={sxStyle} />}
			</CircleButton>

			<CircleButton variant="contained" color="error" onClick={handleHangUp}>
				<CallEndIcon sx={sxStyle} />
			</CircleButton>
		</>
	);
});

export default ThreeButtons;

// <CircleButton onClick={handleAudioClick} variant="contained">
//   {StoreRoom.audioEnebaled ? "Отключить аудио" : "Включить аудио"}
// </CircleButton>

// <CircleButton onClick={handleVideoClick} variant="contained">
//   {StoreRoom.videoEnabled ? "Отключить видео" : "Включить видео"}
// </CircleButton>

// <CircleButton onClick={handleHangUp} variant="contained">
//   Бросить трубу
// </CircleButton>
