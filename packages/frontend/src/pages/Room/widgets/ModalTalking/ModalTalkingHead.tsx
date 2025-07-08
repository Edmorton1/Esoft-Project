import StoreTalking from "@app/client/pages/Room/widgets/ModalTalking/store/Store-Talking";
import {LOCAL_VIDEO, MODAL_TALKING, REMOTE_VIDEO} from "@app/shared/CONST";
import {observer} from "mobx-react-lite";
import {useEffect, useRef, useState} from "react";
import useDebounceCallback from "@app/client/shared/hooks/useDebounceCallback";
import ModalTalkingBody from "@app/client/pages/Room/widgets/ModalTalking/ModalTalkingBody";

export type manyVideosTypes = "none" | "one" | "two"

function ModalTalkingHead() {
	const handleClose = () => StoreTalking.closeModal();

	const containerRef = useRef(null);
	const [manyVideos, setManyVideos] = useState<manyVideosTypes>("none");
	const [showInterface, setShowInterface] = useState(true);

	const debounce = useDebounceCallback();

	useEffect(() => {
		console.log("Перехват");
		const updateVideo = () => {
			const remoteVideo = document.getElementById(REMOTE_VIDEO);
			const localVideo = document.getElementById(LOCAL_VIDEO);

			const isRemoteVisible = remoteVideo && remoteVideo.offsetParent !== null;
			const isLocalVisible = localVideo && localVideo.offsetParent !== null;

			const noVideos = !isRemoteVisible && !isLocalVisible;
			const twoVideos = isRemoteVisible && isLocalVisible;

			if (noVideos) {
				setManyVideos("none");
			} else if (twoVideos) {
				localVideo.style.width = "35%";
				localVideo.style.height = "35%";
				localVideo.style.zIndex = "1";

				setManyVideos("two");
			} else {
				if (localVideo) {
					localVideo.style.width = "100%";
					localVideo.style.height = "100%";
					localVideo.style.zIndex = "0";
				}
        setManyVideos("one");
			}

			if (noVideos) {
				setShowInterface(true);
			}

			console.log("STATUS");
		};

		const observer = new MutationObserver(updateVideo);

		const container = document.getElementById(MODAL_TALKING);
		if (container) {
			observer.observe(container, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ["style", "class"],
			});
		}
		console.log(observer, container, "observer container");

		return () => observer.disconnect();
	}, [containerRef.current]);

	useEffect(() => {
		if (StoreTalking.isOpen) {
			setShowInterface(true);
		}
	}, [StoreTalking.isOpen]);

	const mouseOver = () => {
		setShowInterface(true);

		debounce(() => {
			manyVideos !== "none" && setShowInterface(false);
			console.log("2 сек прошло");
		});
	};

	const mouseLeave = () => {
		setShowInterface(false);
	};

	const onClick = () => {
		setShowInterface(true);
	};

	return (
		<ModalTalkingBody
			onClick={onClick}
			mouseLeave={mouseLeave}
			mouseOver={mouseOver}
			containerRef={containerRef}
			handleClose={handleClose}
			manyVideos={manyVideos}
			showInterface={showInterface}
		/>
	);
}

export default observer(ModalTalkingHead);
