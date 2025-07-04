import StoreSettings from "@app/client/pages/Settings/widgets/store/Store-Settings"
import Box from "@mui/material/Box"
import { useRef } from "react"
import * as style from "@app/client/shared/css/pages/Settings.module.scss"
import StoreForm from "@app/client/shared/stores/Store-Form"
import Button from "@mui/material/Button"
import { observer } from "mobx-react-lite"

function AvatarRow({sx}: {sx: object}) {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const onChange = () => {
    const file = fileRef.current?.files![0]
    console.log("FILE,", file)
    file && StoreSettings.uploadAvatar(file)
  }
  
  const onClick = () => {
    fileRef.current?.click()
  }

  return <Box sx={sx} component={"div"} className={style['container__form--avatar']}>
    <img src={StoreForm.form?.avatar} alt="" />
    <input type="file" onChange={onChange} ref={fileRef} style={{display: "none"}} />
    <Button variant="contained" onClick={onClick}>Загрузить аватар</Button>
  </Box>
}

export default observer(AvatarRow)