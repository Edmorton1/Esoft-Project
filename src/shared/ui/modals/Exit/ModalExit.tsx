import BaseModal from "@/shared/ui/modals/BaseModal/BaseModal"
import StoreExit from "@/shared/ui/modals/Exit/Store-Exit"
import * as style from "@/shared/css/modules/ExitModal.module.scss"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { BG_PAPER } from "@shared/COLORS"
import StoreUser from "@/shared/stores/Store-User"
import { useNavigate } from "react-router-dom"

function ModalExit() {
  const navigate = useNavigate()

  const handleYes = () => {
    navigate("/")
    StoreExit.closeModal()
    StoreUser.logout()
  }
  const handleNo = () => StoreExit.closeModal()

  return <BaseModal Store={StoreExit}>
    <Box component={"section"} className={style.container} bgcolor={BG_PAPER}>
      <Typography variant="h5">Вы действительно хотите выйти?</Typography>
      <Box component={"div"} className={style.container__actions}>
        <Button variant="contained" color="success" onClick={handleNo}>Нет</Button>
        <Button variant="contained" color="error" onClick={handleYes}>Да</Button>
      </Box>
    </Box>
  </BaseModal>
}

export default ModalExit