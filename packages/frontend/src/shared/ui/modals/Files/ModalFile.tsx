import { convertToResolution, guesType } from "@app/client/pages/Messages/InsideMessage/func/FileFunctions";
import BaseModal from "@app/client/shared/ui/modals/BaseModal/BaseModal";
import StoreModalFile from "@app/client/shared/ui/modals/Files/StoreModalFile";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
// import * as styles from "@app/client/shared/css/pages/MessagesInside.module.scss"

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
