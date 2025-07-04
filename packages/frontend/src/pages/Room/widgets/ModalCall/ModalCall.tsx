import PeerResponder from "@app/client/pages/Room/WebRTC/logic/PeerResponder";
import StoreRoom from "@app/client/pages/Room/WebRTC/Store-Room";
import StoreCall from "@app/client/pages/Room/widgets/ModalCall/store/Store-Call";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {MODAL_CALL} from "@app/shared/CONST";
import {observer} from "mobx-react-lite";
// import PhoneIcon from '@mui/icons-material/Phone'
// import CallEndIcon from "@mui/icons-material/CallEnd"
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CircleButton, {sxStyle} from "@app/client/shared/ui/mui_components/CircleButton";

import * as styles from "@app/client/shared/css/modules/ModalCall.module.scss";

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
