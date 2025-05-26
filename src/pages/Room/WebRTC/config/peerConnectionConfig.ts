import setupDataChannel from "@/pages/Room/WebRTC/config/dataChannelConfig";
import AudioControl from "@/pages/Room/WebRTC/AudioControl";
import VideoControl from "@/pages/Room/WebRTC/VideoControl";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";

const setupPeerConnection = (peerConnection: RTCPeerConnection, dataChanel: RTCDataChannel) => {
	console.log("SETUP PEER CONNECTION")
	peerConnection.onicecandidate = e =>
		console.log(
			"icecandidate",
			JSON.stringify(peerConnection.localDescription),
		);

	peerConnection.ondatachannel = e => {
		// if (dataChanel) {
			console.log("ПОМЕНЯЛСЯ datachannel");
			StoreRoom.Peer?.updateDataChannel(setupDataChannel(e.channel));
		// }
	};
	// РЕАКЦИЯ НА ЧУЖОЙ ТРЕК
	peerConnection.ontrack = e => {
		console.log("track", e.track);
		const isVideo = e.track.kind === "video";
		console.log("isVideo", e.track.kind);
		const remoteStream = e.streams[0];
		if (isVideo) {
			VideoControl.createRemoteVideo(remoteStream);
		} else {
			AudioControl.createRemoteAudio(remoteStream);
		}
	};

  return peerConnection
};

export default setupPeerConnection;
