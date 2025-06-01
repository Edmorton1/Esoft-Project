import Clock from "@/pages/Room/widgets/ModalTalking/components/Clock";
import StoreCall from "@/pages/Room/widgets/ModalCall/store/Store-Call";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as styles from "@/shared/css/ModalTalking.module.scss";
import { manyVideosTypes } from "@/pages/Room/widgets/ModalTalking/ModalTalkingHead";

function Info({manyVideos}: {manyVideos: manyVideosTypes}) {
	return (
		<>
			{manyVideos === "none" && StoreCall.anotherForm && (
				<Box
					className={styles.wrapper__avatar}
					src={StoreCall.anotherForm?.avatar || "/placeholder.png"}
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
