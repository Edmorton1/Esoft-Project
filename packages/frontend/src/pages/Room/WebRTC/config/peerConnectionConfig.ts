import setupDataChannel from "@app/client/pages/Room/WebRTC/config/dataChannelConfig";
import AudioControl from "@app/client/pages/Room/WebRTC/controllers/AudioControl";
import VideoControl from "@app/client/pages/Room/WebRTC/controllers/VideoControl";
import StoreRoom from "@app/client/pages/Room/WebRTC/Store-Room";

const setupPeerConnection = (peerConnection: RTCPeerConnection) => {
	console.log("SETUP PEER CONNECTION")
	peerConnection.onicecandidate = () =>
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
		console.log("e track kind", e.track.kind);
		console.log('[STREAMS]', e.streams)
		const remoteStream = e.streams[0];
		if (isVideo) {
			console.log('ДЕЛАЕМ РЕМОТ ВИДЕО')
			VideoControl.createRemoteVideo(remoteStream);
		} else {
			console.log("РЕМОТ АУДИО")
			AudioControl.createRemoteAudio(remoteStream);
		}
	};
	// Он коннекшн фейлед ждёт 15 сек и отключает
	peerConnection.onconnectionstatechange = () => {
		console.log('[ON CONNECTION SET CHANGE]', peerConnection.connectionState)
		if (peerConnection.connectionState === 'closed') {
			console.log('[PEER CONNECTION] CLOSE: КАНАЛ ЗАКРЫЛСЯ')
			StoreRoom.cleaning()
		}
	}

  return peerConnection
};

export default setupPeerConnection;
