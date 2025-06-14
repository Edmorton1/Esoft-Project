import EditSquareIcon from '@mui/icons-material/EditSquare';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import StoreUser from '@/shared/stores/Store-User';
import MinButton from '@/shared/ui/kit/MinButton';
import { sxStyle } from '@/shared/ui/kit/CircleButton';
import * as style from "@/shared/css/pages/Settings.module.scss"

function EditRow() {
  return <div className={style.section__row}>
    <Typography>Почта: </Typography>
    <Typography>{StoreUser.user?.email}</Typography>
    <MinButton><EditSquareIcon color='info' sx={sxStyle} /></MinButton>
  </div>
}

export default EditRow