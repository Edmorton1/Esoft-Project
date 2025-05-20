import PeerResponder from "@/pages/Room/WebRTC/PeerResponder";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import StoreCall from "@/shared/ui/ModalCall/StoreCall";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
// import PhoneIcon from '@mui/icons-material/Phone'
// import CallEndIcon from "@mui/icons-material/CallEnd"

function ModalCall() {
  const handleClose = () => StoreCall.closeModal()
  const handleTake = () => {if (StoreRoom.Peer instanceof PeerResponder) StoreRoom.Peer.createAnswer()}

  return (
    <>
      <Dialog open={StoreCall.isOpen} onClose={handleClose}>
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
          <Button color="success" variant="contained" onClick={handleTake}>Взять</Button>
          <Button color="error" variant="contained">Не брать</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default observer(ModalCall)