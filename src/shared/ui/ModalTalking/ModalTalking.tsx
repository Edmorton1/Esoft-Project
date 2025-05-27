import ButtonAudio from "@/pages/Room/ButtonAudio";
import ButtonVideo from "@/pages/Room/ButtonVideo";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import StoreTalking from "@/shared/ui/ModalTalking/Store-Talking";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MODAL_TALKING } from "@shared/CONST";
import { observer } from "mobx-react-lite";

function ModalCall() {
  const handleClose = () => StoreTalking.closeModal()

  const handleHangUp = () => StoreRoom.hangUp()

  return (
    <>
      <Dialog open={StoreTalking.isOpen} onClose={handleClose} keepMounted>
          ModalTalking
          ModalTalking
          <div id={MODAL_TALKING}>sdasdasdasdaas</div>
          <ButtonAudio />
          <ButtonVideo />
          <Button onClick={handleHangUp} variant="contained">Бросить трубку</Button>
      </Dialog>
    </>
  )
}

export default observer(ModalCall)

      // <Dialog open={StoreTalking.isOpen} onClose={handleClose} id={MODAL_TALKING}>
      //   <DialogTitle>
      //     ModalTalking
      //   </DialogTitle>
      //   <DialogContent>
      //     ModalTalking
      //   </DialogContent>
      //   <DialogActions>
      //     <ButtonAudio />
      //     <ButtonVideo />
      //     <Button onClick={handleHangUp} variant="contained">Бросить трубку</Button>
      //   </DialogActions>
      // </Dialog>