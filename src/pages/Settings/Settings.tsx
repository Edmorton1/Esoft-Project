import AccountSettings from "@/pages/Settings/widgets/Account/AccountSettings"
import ProfileSettings from "@/pages/Settings/widgets/Profile/ProfileSettings"
import Typography from "@mui/material/Typography"
import * as style from "@/shared/css/pages/Settings.module.scss"

function Settings() {

  return <section className={style.container}>
    <Typography variant="h4">Настройки аккаунта</Typography>
    <AccountSettings />
    <Typography variant="h4">Настройки профиля</Typography>
    <ProfileSettings/>
  </section>
}

export default Settings