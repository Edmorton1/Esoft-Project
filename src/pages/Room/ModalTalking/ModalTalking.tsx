import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import StoreTalking from "@/pages/Room/ModalTalking/Store-Talking";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import {MODAL_TALKING} from "@shared/CONST";
import {observer} from "mobx-react-lite";
import * as styles from "@/shared/css/ModalCall.module.scss"
import ThreeButtons from "@/pages/Room/Buttons";
import Typography from "@mui/material/Typography";
import Clock from "@/pages/Room/Clock";
import StoreCall from "@/pages/Room/ModalCall/Store-Call";

function ModalCall() {
  const handleClose = () => StoreTalking.closeModal();

  return (
    <Modal open={StoreTalking.isOpen} onClose={handleClose} keepMounted>
      <Fade in={StoreTalking.isOpen}>
        <Box
          sx={{
            width: 800,
            height: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
          id={MODAL_TALKING}
          className={styles.wrapper}
        >
          {/* <Box
            sx={{bgcolor: "background.paper"}}
            className={styles.wrapper__video}
            component="video"
          /> */}

          <Box
            className={styles.wrapper__avatar}
            src={StoreCall.anotherForm?.avatar || "/placeholder.png"}
            component={"img"}>
          </Box>
          
          <Box className={styles.wrapper__text}>
            <Typography variant="h6">{StoreCall.anotherForm?.name}</Typography>
            <Clock />
          </Box>


          <Box className={styles.wrapper__controls}>
            <ThreeButtons />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default observer(ModalCall);

// return (
//   <>
//     <Dialog open={StoreTalking.isOpen} onClose={handleClose} keepMounted>
//         ModalTalking
//         ModalTalking
//         <div id={MODAL_TALKING}>sdasdasdasdaas</div>
//         <ButtonAudio />
//         <ButtonVideo />
//         <Button onClick={handleHangUp} variant="contained">Бросить трубку</Button>
//     </Dialog>
//   </>
// )
