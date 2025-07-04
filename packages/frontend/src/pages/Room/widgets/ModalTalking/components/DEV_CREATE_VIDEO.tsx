import VideoControl from "@app/client/pages/Room/WebRTC/controllers/VideoControl";
import { LOCAL_VIDEO, REMOTE_VIDEO } from "@app/shared/CONST";

function DEV_CREATE_VIDEO() {
	const devEnableVideo = (url: string) => {
		const unHideEl = (el: HTMLElement | null) => el && (el.style.display = "");
		const el = document.getElementById(url);
		el
			? unHideEl(el)
			: url === REMOTE_VIDEO
				? VideoControl.createRemoteVideo(new MediaStream())
				: VideoControl.createLocalVideo(new MediaStream());
	};

	const devDisableVideo = (url: string) => {
		const hideEl = (el: HTMLElement | null) =>
			el && (el.style.display = "none");
		const el = document.getElementById(url);
		hideEl(el);
	};

	return (
		<>
			<button onClick={() => devEnableVideo(LOCAL_VIDEO)}>
				Добавить локал видео
			</button>
			<button onClick={() => devDisableVideo(LOCAL_VIDEO)}>
				Удалить локал
			</button>
			<button onClick={() => devEnableVideo(REMOTE_VIDEO)}>
				Добавить ремот видео
			</button>
			<button onClick={() => devDisableVideo(REMOTE_VIDEO)}>
				Удалить remote
			</button>
		</>
	);
}

export default DEV_CREATE_VIDEO;
