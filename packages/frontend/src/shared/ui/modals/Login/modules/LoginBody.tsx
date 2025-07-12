import { InputMui } from "@app/client/shared/ui/mui_module_components/MuiComponents";
import Typography from "@mui/material/Typography";
import { UserDTO } from "@app/types/gen/dtoObjects";
import { observer } from "mobx-react-lite";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import * as style from "@app/client/shared/css/pages/Login.module.scss"
import { LOGO_IMG_BIG } from "@app/shared/PUBLIC";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { paths } from "@app/shared/PATHS";
import { Link } from "react-router-dom";
import StoreLogin from "@app/client/shared/ui/modals/Login/stores/Store-Login";
import GoogleButton from "@app/client/shared/ui/modals/Login/components/GoogleButton";

function LoginBody({onSubmit, register, errors}: {onSubmit: () => void, register: UseFormRegister<UserDTO>, errors: FieldErrors<UserDTO>}) {
  // const buttonVariant = 'outlined'

  return <Paper className={style.modal}>
      <Typography variant="h3">Войти</Typography>
      <img src={LOGO_IMG_BIG} alt="" />

      <form onSubmit={onSubmit} className={style.modal__form}>
        <InputMui text={"Почта"} id="email" error={errors.email} register={register} />
        <InputMui text={"Пароль"} id="password" type="password" error={errors.password} register={register}>
        </InputMui>
        <Button type="submit" variant="contained">Войти</Button>
      </form>
      <GoogleButton />
      <Link to={paths.registration}><Button variant="contained" onClick={StoreLogin.closeModal}>Регистрация</Button></Link>
    </Paper>
}

export default observer(LoginBody)
