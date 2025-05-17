import VoiceMessage from "@/pages/Messages/widgets/modules/classes/VoiceMessage";
import AudioControl from "@/pages/Room/WebRTC/AudioControl";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import { useEffect, useRef } from "react";

type Constructor<T> = new (...args: any[]) => T

// function useVoice(clas: VoiceMessage | AudioControl): VoiceMessage | null {
function useVoice<T extends AudioControl | VoiceMessage>(Clazz: Constructor<T>, toid?: number | string): React.RefObject<T | null> {
  const ref = useRef<T | null>(null)

	useEffect(() => {
		const setup = async () => {
			const stream = await navigator.mediaDevices.getUserMedia({audio: true});
			ref.current = new Clazz(stream, toid);

      if (Clazz instanceof AudioControl) {
        stream.getAudioTracks().forEach(track => StoreRoom.peerConnection.addTrack(track, stream))
      }
		};

		setup();
	}, []);

  return ref
}

export default useVoice;
