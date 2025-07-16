import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import StoreBaseModal from "@app/client/shared/ui/modals/BaseModal/Store-BaseModal";
import {ReactNode} from "react";
import {observer} from "mobx-react-lite";
import Fade from "@mui/material/Fade";

interface propsInterface {
	Store: StoreBaseModal;
	children: ReactNode;
}

function BaseModal({Store, children}: propsInterface) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	};

	return (
		<Modal
			open={Store.isOpen}
			onClose={Store.closeModal}>
      <Fade in={Store.isOpen}>
        <Box sx={style}>
          {children}
        </Box>
      </Fade>
		</Modal>
	);
}

export default observer(BaseModal);
