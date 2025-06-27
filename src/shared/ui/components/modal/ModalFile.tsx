import { convertToResolution, guesType } from "@/pages/Messages/InsideMessage/func/FileFunctions";
import BaseModal from "@/shared/ui/components/BaseModal/BaseModal";
import StoreModalFile from "@/shared/ui/components/modal/StoreModalFile";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { observer } from "mobx-react-lite";
// import * as styles from "@/shared/css/pages/MessagesInside.module.scss"

function ModalFile() {
	console.log(StoreModalFile.file)

	return (
		<BaseModal
			Store={StoreModalFile}
      // container={document.getElementsByClassName(styles.section)[0]}
      >
			<Box component={guesType(convertToResolution(StoreModalFile.file || ''))} src={StoreModalFile.file!} controls />
		</BaseModal>
	);
}

export default observer(ModalFile);
