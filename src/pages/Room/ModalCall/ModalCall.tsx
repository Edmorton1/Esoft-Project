import PeerResponder from "@/pages/Room/WebRTC/PeerResponder";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import StoreCall from "@/pages/Room/ModalCall/Store-Call";
import StoreTalking from "@/pages/Room/ModalTalking/Store-Talking";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MODAL_CALL } from "@shared/CONST";
import { observer } from "mobx-react-lite";
// import PhoneIcon from '@mui/icons-material/Phone'
// import CallEndIcon from "@mui/icons-material/CallEnd"

function ModalCall() {
  const handleClose = () => StoreCall.closeModal()
  const handleTake = () => {if (StoreRoom.Peer instanceof PeerResponder) StoreRoom.Peer.createAnswer(); StoreCall.closeModal(); StoreTalking.openModal()}

  const handleCancel = () => {StoreRoom.cancel(); StoreCall.closeModal()}

  return (
    <>
      <Dialog open={StoreCall.isOpen} onClose={handleClose} id={MODAL_CALL}>
        <DialogTitle>
          {StoreCall.name} звонит!
        </DialogTitle>
        <DialogContent>
          Алло братан возьми трубу
        </DialogContent>
        <DialogActions>
          {/* <Box sx={{backgroundColor: "red", borderRadius: "50%", width: "1000px", height: "1000px"}}>
            <PhoneIcon/>
          </Box>
          <CallEndIcon/> */}
          <Button onClick={handleTake} color="success" variant="contained" >Взять</Button>
          <Button onClick={handleCancel} color="error" variant="contained">Не брать</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default observer(ModalCall)