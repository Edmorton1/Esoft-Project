import StoreTalking from "@app/client/pages/Room/widgets/ModalTalking/store/Store-Talking";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { MODAL_TALKING } from "@app/shared/CONST";
import * as styles from "@app/client/shared/css/modules/ModalTalking.module.scss"
import ThreeButtons from "@app/client/pages/Room/widgets/ModalTalking/components/ThreeButtons";
import { manyVideosTypes } from "@app/client/pages/Room/widgets/ModalTalking/ModalTalkingHead";
import Info from "@app/client/pages/Room/widgets/ModalTalking/components/Info";
import { observer } from "mobx-react-lite";

interface propsInterface {
  onClick: () => void,
  manyVideos: manyVideosTypes,
  handleClose: () => void,
  showInterface: boolean,
  containerRef: React.RefObject<null>,
  mouseOver: () => void,
  mouseLeave: () => void,
}

function ModalTalkingBody({handleClose, showInterface, containerRef, mouseOver, mouseLeave, onClick, manyVideos}: propsInterface) {

	return (
		<Modal open={StoreTalking.isOpen} onClose={handleClose} keepMounted>
			<Fade in={StoreTalking.isOpen}>
				<Box sx={{bgcolor: "background.paper", cursor: showInterface ? "auto" : "none"}}
					id={MODAL_TALKING}
					ref={containerRef}
					className={styles.main}
					component={"div"}
					onMouseMove={mouseOver}
					onMouseLeave={mouseLeave}
					onClick={onClick}>
            
          <Fade in={showInterface}>
            <Box className={styles.wrapper}>

              <Box className={styles.wrapper__info}>
                <Info manyVideos={manyVideos} />
              </Box>

              <Box className={styles.wrapper__controls}>
                <ThreeButtons />
              </Box>

            </Box>
          </Fade>
          
				</Box>
			</Fade>
		</Modal>
	);
}

export default observer(ModalTalkingBody);
