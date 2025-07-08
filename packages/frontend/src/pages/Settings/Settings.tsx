import AccountSettings from "@app/client/pages/Settings/widgets/Account/AccountSettings"
import ProfileSettings from "@app/client/pages/Settings/widgets/Profile/ProfileSettings"
import Typography from "@mui/material/Typography"
import * as style from "@app/client/shared/css/pages/Settings.module.scss"

function Settings() {

  return <div className={style.container}>
    <Typography variant="h4">Настройки аккаунта</Typography>
    <AccountSettings />
    <Typography variant="h4">Настройки профиля</Typography>
    <ProfileSettings/>
  </div>
}

export default Settings