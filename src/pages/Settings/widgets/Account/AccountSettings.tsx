import EditRow from "@/pages/Settings/widgets/components/EditRow"
import { AccountSchema } from "@/pages/Settings/widgets/schema/Schemas"
import StoreUser from "@/shared/stores/Store-User"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { useForm } from "react-hook-form"
import * as style from "@/shared/css/pages/Settings.module.scss"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import StorePassword from "@/pages/Settings/widgets/store/Store-Password"

function AccountSettings() {

  return <Paper className={style.container__form}>
    <Typography>Пароль</Typography>
    <IconButton onClick={() => StorePassword.openModal()}>{<EditSquareIcon/>}</IconButton>
  </Paper>
}

export default AccountSettings