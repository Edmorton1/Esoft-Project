import {LOCAL_VIDEO, MODAL_TALKING, REMOTE_VIDEO} from "@shared/CONST";

class VideoControl {
	createLocalVideo = (stream: MediaStream): void => {
		console.log("[VideoControl] Video получено:", stream);
		// РЕАКЦИЯ НА СВОЙ
		const localVideo = document.createElement("video");
		localVideo.srcObject = stream;
		// localVideo.controls = true;
		localVideo.autoplay = true;
		localVideo.muted = true;
		// localVideo.style.width = "1000px";
		localVideo.id = LOCAL_VIDEO;
		document.getElementById(MODAL_TALKING)?.appendChild(localVideo);
		// document.body.appendChild(video);
	};

	createRemoteVideo = (remoteStream: MediaStream): void => {
		const remoteVideo = document.createElement("video");
		remoteVideo.srcObject = remoteStream;
		remoteVideo.autoplay = true;
		// remoteVideo.controls = true;
		// remoteVideo.style.width = "1000px";
		remoteVideo.id = REMOTE_VIDEO;
		document.getElementById(MODAL_TALKING)?.appendChild(remoteVideo);
    // document.body.appendChild(remoteVideo)
	};
}

export default new VideoControl;
