import * as style from "@/shared/css/pages/Settings.module.scss"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import StoreSettings from "@/pages/Settings/widgets/store/Store-Settings"

function AccountSettings() {
  // ПОЧТУ В БУДУЩЕМ СДЕЛАТЬ КОГДА БУДЕТ ДОБАВЛЕНА ПОЧТА САЙТА С РАССЫЛКОЙ

  return <Paper className={style.container__form}>
    <div>
      <Typography>Почта</Typography>
    </div>
    <div>
      <Typography>Пароль</Typography>
      <IconButton onClick={() => StoreSettings.openModal()}>{<EditSquareIcon/>}</IconButton>
    </div>
  </Paper>
}

export default AccountSettings