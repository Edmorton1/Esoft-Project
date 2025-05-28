import StoreTalking from "@/pages/Room/ModalTalking/Store-Talking";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import {LOCAL_VIDEO, MODAL_TALKING, REMOTE_VIDEO} from "@shared/CONST";
import {observer} from "mobx-react-lite";
import * as styles from "@/shared/css/ModalCall.module.scss"
import ThreeButtons from "@/pages/Room/Buttons";
import Typography from "@mui/material/Typography";
import Clock from "@/pages/Room/Clock";
import StoreCall from "@/pages/Room/ModalCall/Store-Call";
import VideoControl from "@/pages/Room/WebRTC/controllers/VideoControl";
import { useEffect, useRef, useState } from "react";
import useMouseDebounce from "@/pages/Room/ModalTalking/useMouseDebounce";

function ModalCall() {
  const handleClose = () => StoreTalking.closeModal();
  const containerRef = useRef(null)
  const [manyVideos, setManyVideos] = useState<'none' | 'one' | 'two' >('none')
  const [showInterface, setShowInterface] = useState(true)

  const devEnableVideo = (url: string) => {
    const unHideEl = (el: HTMLElement | null) => el && (el.style.display = '')
    const el = document.getElementById(url)
    el ? unHideEl(el) : (url === REMOTE_VIDEO ? VideoControl.createRemoteVideo(new MediaStream) : VideoControl.createLocalVideo(new MediaStream))
  }
  
  const devDisableVideo = (url: string) => {
    const hideEl = (el: HTMLElement | null) => el && (el.style.display = 'none')
    const el = document.getElementById(url)
    hideEl(el)
  }

  const debounce = useMouseDebounce()
  console.log(showInterface)

  useEffect(() => {
    console.log('Перехват')
    const observer = new MutationObserver(() => {
      const remoteVideo = document.getElementById(REMOTE_VIDEO)
      const localVideo = document.getElementById(LOCAL_VIDEO)
      const isRemoteVisible = remoteVideo && remoteVideo.offsetParent !== null
      const isLocalVisible = localVideo && localVideo.offsetParent !== null
      setManyVideos(() => {
        // (!isRemoteVisible && !isLocalVisible) ? 'none' : (isRemoteVisible && isLocalVisible) ? 'two' : 'one'
        if (!isRemoteVisible && !isLocalVisible) {
          return 'none'
        } else if (isRemoteVisible && isLocalVisible) {
          localVideo.style.width = "50%";
          localVideo.style.height = "50%";
          localVideo.style.zIndex = "1"

          return 'two'
        } else {
          if (localVideo) {
            localVideo.style.width = "100%";
            localVideo.style.height = "100%";
            localVideo.style.zIndex = "0"
          }
        }
        return 'one'
      })
      if (!isRemoteVisible && !isLocalVisible) {
        setShowInterface(true)
      }

      console.log('STATUS')
      // setShowInterface(true)  
    })

    const container = document.getElementById(MODAL_TALKING);
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      })
    }
    console.log(observer, container, 'observer container')

    return () => observer.disconnect()
  }, [containerRef.current])

  useEffect(() => {
      if (StoreTalking.isOpen) {
        setShowInterface(true)
      }
  }, [StoreTalking.isOpen])

  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowInterface(true)
    e.preventDefault()
    const parent = e.currentTarget
    const child = e.target
    console.log('Реакцяи')

    debounce(() => manyVideos !== 'none' && setShowInterface(false))
  }

  const mouseLeave = () => {
    setShowInterface(false)
  }

  const onClick = () => {
    setShowInterface(true)
  }

  return (
    <Modal open={StoreTalking.isOpen} onClose={handleClose} keepMounted>
      <Fade in={StoreTalking.isOpen}>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            overflow: "auto",
            cursor: showInterface ? "auto" : "none"
          }}
          id={MODAL_TALKING}
          ref={containerRef}
          className={styles.wrapper}
          component={"div"}

          onMouseMove={mouseDown}
          onMouseLeave={mouseLeave}
          onClick={onClick}
        >
          {/* <Box
            sx={{bgcolor: "background.paper"}}
            className={styles.wrapper__video}
            component="video"
          /> */}
          <Fade in={showInterface}>
            <Box className={styles.wrapper__info}>
              {manyVideos === 'none' && <Box
                className={styles.wrapper__avatar}
                src={StoreCall.anotherForm?.avatar || "/placeholder.png"}
                component={"img"}>
              </Box>}
            

                <Typography variant="h6">{StoreCall.anotherForm?.name || "ТЕСТОВОЕ ИМЯ"}</Typography>
                <Clock />
                <button onClick={() => devEnableVideo(LOCAL_VIDEO)}>Добавить локал видео</button>
                <button onClick={() => devDisableVideo(LOCAL_VIDEO)}>Удалить локал</button>
                <button onClick={() => devEnableVideo(REMOTE_VIDEO)}>Добавить ремот видео</button>
                <button onClick={() => devDisableVideo(REMOTE_VIDEO)}>Удалить remote</button>
                manyVideos: {manyVideos}
            </Box>
          </Fade>

          <Fade in={showInterface}>
            <Box className={styles.wrapper__controls}>
                <ThreeButtons />
            </Box>
          </Fade>
        {/* <video src="" id={REMOTE_VIDEO} controls></video>
        <video src="" id={LOCAL_VIDEO} controls></video> */}
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
