import {LOCAL_VIDEO, REMOTE_VIDEO} from "@shared/CONST";

class VideoControl {
	createLocalVideo = (stream: MediaStream) => {
		console.log("[VideoControl] Video получено:", stream);
		// РЕАКЦИЯ НА СВОЙ
		const video = document.createElement("video");
		video.srcObject = stream;
		video.controls = true;
		video.autoplay = true;
		video.muted = true;
		video.style.width = "300px";
		video.id = LOCAL_VIDEO;
		document.body.appendChild(video);
	};

	createRemoteVideo = (remoteStream: MediaStream) => {
		const remoteVideo = document.createElement("video");
		remoteVideo.srcObject = remoteStream;
		remoteVideo.autoplay = true;
		remoteVideo.controls = true;
		remoteVideo.style.width = "300px";
		remoteVideo.id = REMOTE_VIDEO;
		document.body.appendChild(remoteVideo);
	};
}

export default new VideoControl;
