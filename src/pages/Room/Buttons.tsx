import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import { observer } from "mobx-react-lite"
import * as styles from "@/shared/css/ModalCall.module.scss"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles";
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOff from "@mui/icons-material/MicOff"
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const ICON_SIZE = "100%"

const CircleButton = styled(Button)({
  borderRadius: '50%',
  width: 80,
  height: 80,
});

const sxStyle = {width: ICON_SIZE, height: ICON_SIZE}

const ThreeButtons = observer(() => {
  const handleAudioClick = () => {
    StoreRoom.audioEnebaled ? StoreRoom.disableAudio() : StoreRoom.enableAudio();
  };

  const handleVideoClick = () => {
    StoreRoom.videoEnabled ? StoreRoom.disableVideo(true) : StoreRoom.enableVideo(true);
  };
  
  const handleHangUp = () => StoreRoom.hangUp();

  return (
    <>
      <CircleButton onClick={handleAudioClick} variant="contained">
        {StoreRoom.audioEnebaled
        ? <MicOff sx={sxStyle} />
        : <MicIcon sx={sxStyle} />}
      </CircleButton>

      <CircleButton onClick={handleVideoClick} variant="contained">
        {StoreRoom.videoEnabled
        ? <VideocamOffIcon sx={sxStyle} />
        : <VideocamIcon sx={sxStyle} />}
      </CircleButton>

      <CircleButton variant="contained" color="error" onClick={handleHangUp}>
        <CallEndIcon sx={sxStyle} />
      </CircleButton>
    </>
  );
});

export default ThreeButtons

      // <CircleButton onClick={handleAudioClick} variant="contained">
      //   {StoreRoom.audioEnebaled ? "Отключить аудио" : "Включить аудио"}
      // </CircleButton>

      // <CircleButton onClick={handleVideoClick} variant="contained">
      //   {StoreRoom.videoEnabled ? "Отключить видео" : "Включить видео"}
      // </CircleButton>

      // <CircleButton onClick={handleHangUp} variant="contained">
      //   Бросить трубу
      // </CircleButton>