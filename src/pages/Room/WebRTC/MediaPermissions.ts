import StoreRoom from "@/pages/Room/WebRTC/Store-Room";

class MediaPermissions {
	private getDevices = async () => {
		const devices = await navigator.mediaDevices.enumerateDevices();

		const hasVideoInput = devices.some(device => device.kind === "videoinput" && device.label);
		const hasAudioInput = devices.some(device => device.kind === "audioinput" && device.label);

    devices.forEach(e => console.log(e.label))
		return [hasVideoInput, hasAudioInput];
	};

  private checkPermissons = async (): Promise<[boolean, boolean]> => {
    const [hasVideoInput, hasAudioInput] = await this.getDevices()
    console.log('ВСЁ ЧТО ЕСТЬ 2', hasVideoInput, hasAudioInput)
    
    let videoAllowed = false;
    let audioAllowed = false;
    
    try {
      if (hasVideoInput || hasAudioInput) {
        const stream = await navigator.mediaDevices.getUserMedia({video: hasVideoInput, audio: hasAudioInput})
        videoAllowed = stream.getVideoTracks().length > 0
        audioAllowed = stream.getAudioTracks().length > 0
        stream.getTracks().forEach(track => track.stop())
      }
    } catch(e) {
      console.warn(`Доступ запрещён`, `video: ${videoAllowed}`, `audio: ${audioAllowed}`, e)
    }
    return [videoAllowed, audioAllowed]
  }

  setMediaCaller = async (peerConnection: RTCPeerConnection): Promise<MediaStream> => {
    const [videoAllowed, audioAllowed] = await this.checkPermissons()
    const stream = await navigator.mediaDevices.getUserMedia({video: videoAllowed,audio: audioAllowed});

    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream);
    });

    return stream
  }

  setMediaResponder = async (peerConnection: RTCPeerConnection): Promise<MediaStream> => {
    const [videoAllowed, audioAllowed] = await this.checkPermissons()
    
    const stream = await navigator.mediaDevices.getUserMedia({video: videoAllowed,audio: audioAllowed})
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream))

    return stream
  }
}

export default new MediaPermissions