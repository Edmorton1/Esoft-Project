import Clock from "@app/client/pages/Room/modules/ModalTalking/components/Clock";
import StoreCall from "@app/client/pages/Room/modules/ModalCall/store/Store-Call";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as styles from "@app/client/shared/css/modules/ModalTalking.module.scss";
import { manyVideosTypes } from "@app/client/pages/Room/modules/ModalTalking/ModalTalkingHead";
import { PLACEHOLDER_IMG } from "@app/shared/PUBLIC";

function Info({manyVideos}: {manyVideos: manyVideosTypes}) {
	return (
		<>
			{manyVideos === "none" && StoreCall.anotherForm && (
				<Box
					className={styles.wrapper__avatar}
					src={StoreCall.anotherForm?.avatar || PLACEHOLDER_IMG}
					component={"img"}
				/>
			)}

			{StoreCall.anotherForm?.name && (
				<Typography variant="h6">{StoreCall.anotherForm.name}</Typography>
			)}

			<Clock />
		</>
	);
}

export default Info;
