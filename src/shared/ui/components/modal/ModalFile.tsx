import { convertToResolution, guesType } from "@/pages/Messages/InsideMessage/func/FileFunctions";
import StoreModalFile from "@/shared/ui/components/modal/StoreModalFile";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { observer } from "mobx-react-lite";
// import * as styles from "@/shared/css/pages/MessagesInside.module.scss"

function ModalFile() {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	};

	console.log(StoreModalFile.file)

	return (
		<Modal
			open={StoreModalFile.isOpen}
			onClose={StoreModalFile.closeModal}
			disableAutoFocus
      // container={document.getElementsByClassName(styles.section)[0]}
      >
			<Box component={guesType(convertToResolution(StoreModalFile.file || ''))} src={StoreModalFile.file!} sx={style} controls />
		</Modal>
	);
}

export default observer(ModalFile);
