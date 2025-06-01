import PeerResponder from "@/pages/Room/WebRTC/logic/PeerResponder";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import StoreCall from "@/pages/Room/widgets/ModalCall/store/Store-Call";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {MODAL_CALL} from "@shared/CONST";
import {observer} from "mobx-react-lite";
// import PhoneIcon from '@mui/icons-material/Phone'
// import CallEndIcon from "@mui/icons-material/CallEnd"
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CircleButton, {sxStyle} from "@/shared/ui/kit/CircleButton";

import * as styles from "@/shared/css/ModalCall.module.scss";

function ModalCall() {
	const handleClose = () => StoreCall.closeModal();
	const handleTake = () => {
		if (StoreRoom.Peer instanceof PeerResponder) StoreRoom.Peer.createAnswer();
	};

	const handleCancel = () => {
		StoreRoom.cancel();
	};

	return (
		<>
			<Dialog open={StoreCall.isOpen} onClose={handleClose} id={MODAL_CALL}>
				<div className={styles.main}>
					<DialogTitle>{StoreCall.anotherForm?.name} звонит вам</DialogTitle>
					{/* <DialogContent>
          Алло братан возьми трубу
        </DialogContent> */}
					<DialogActions className={styles.main__actions}>
						<CircleButton
							onClick={handleTake}
							color="success"
							variant="contained">
							<CallIcon sx={sxStyle} color="action" />
						</CircleButton>
						<CircleButton
							onClick={handleCancel}
							color="error"
							variant="contained">
							<CallEndIcon sx={sxStyle} />
						</CircleButton>
					</DialogActions>
				</div>
			</Dialog>
		</>
	);
}

export default observer(ModalCall);
