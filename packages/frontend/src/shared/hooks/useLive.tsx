// import VoiceMessage from "@app/client/pages/Messages/widgets/MessageWidget/modules/classes/VoiceMessage";
// import AudioControl from "@app/client/pages/Room/WebRTC/AudioControl";
// import StoreRoom from "@app/client/pages/Room/WebRTC/Store-Room";
// import VideoControl from "@app/client/pages/Room/WebRTC/VideoControl";
// import { useEffect, useRef } from "react";

// type Constructor<T> = new (...args: any[]) => T

// // function useVoice(clas: VoiceMessage | AudioControl): VoiceMessage | null {
// function useLive<T extends AudioControl | VoiceMessage, R extends VideoControl>(Audio: Constructor<T>, Video?: Constructor<R>, toid?: number | string): [React.RefObject<T | null>, React.RefObject<R | null>] {
//   const audioRef = useRef<T | null>(null)
//   const videoRef = useRef<R | null>(null)

//   useEffect(() => {
//     const setup = async () => {
//       const devices = await navigator.mediaDevices.enumerateDevices()
//       const hasVideoInput = devices.some(device => device.kind === 'videoinput')
//       console.log('hasVideoInput', hasVideoInput)
//       console.log('videodevice', devices.filter(d => d.kind === 'videoinput'))

//       const hasAudioInput = devices.some(device => device.kind === 'audioinput')
//       const stream = await navigator.mediaDevices.getUserMedia({audio: hasAudioInput, video: hasVideoInput});
//       console.log('getvideotracks', stream.getVideoTracks())
      
//       if (Video) videoRef.current = new Video(stream, toid)
//       console.log('WEBRTC ДОБАВЛЕНА ПЕРЕДАЧА ЗВУКА')
//       audioRef.current = new Audio(stream, toid);

//       if (Audio === AudioControl) {
//         console.log('WEBRTC ДОБАВЛЕНА ПЕРЕДАЧА ЗВУКА')
//         stream.getVideoTracks().forEach(track => StoreRoom.peerConnection.addTrack(track, stream))
//         stream.getAudioTracks().forEach(track => StoreRoom.peerConnection.addTrack(track, stream))
//       }
//       console.log("НИЧЁ НЕ ДОБАВЛЕНО")
//     };

//     // setTimeout(() => setup(), 5000)
//   }, []);

//   return [audioRef, videoRef]
// }

// // export default useLive;
