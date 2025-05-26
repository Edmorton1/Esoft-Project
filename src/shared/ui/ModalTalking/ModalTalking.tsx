import ButtonAudio from "@/pages/Room/ButtonAudio";
import ButtonVideo from "@/pages/Room/ButtonVideo";
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import StoreTalking from "@/shared/ui/ModalTalking/StoreTalking";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { observer } from "mobx-react-lite";

function ModalCall() {
  const handleClose = () => StoreTalking.closeModal()

  const handleTake = () => {if (StoreRoom.Peer instanceof PeerResponder) StoreRoom.Peer.createAnswer()}

  const handleHangUp = () => StoreRoom.hangUp()

  return (
    <>
      <Dialog open={StoreTalking.isOpen} onClose={handleClose}>
        <DialogTitle>
          ModalTalking
        </DialogTitle>
        <DialogContent>
          ModalTalking
        </DialogContent>
        <DialogActions>
          <ButtonAudio />
          <ButtonVideo />
          <Button onClick={handleHangUp} variant="contained">Бросить трубку</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default observer(ModalCall)