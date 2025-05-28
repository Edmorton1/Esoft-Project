import {LOCAL_AUDIO, REMOTE_AUDIO} from "@shared/CONST";

class AudioControl {
	createLocalAudio = (stream: MediaStream) => {
		console.log("[AudioControl] Аудио получено:", stream);
		// РЕАКЦИЯ НА СВОЙ
		const audio = document.createElement("audio");
		audio.id = LOCAL_AUDIO;
		audio.srcObject = stream;
		audio.autoplay = true;
		audio.muted = true; // чтобы не ловить эхо
		audio.controls = true;
		document.body.appendChild(audio);
	};

	createRemoteAudio = (remoteStream: MediaStream) => {
		const remoteAudio = document.createElement("audio");
		remoteAudio.srcObject = remoteStream;
		remoteAudio.autoplay = true;
		remoteAudio.id = REMOTE_AUDIO;
		document.body.appendChild(remoteAudio);
	};
}

export default new AudioControl();
