import { InputMui } from "@/shared/components/MuiComponents";
import Typography from "@mui/material/Typography";
import { UserDTO } from "@t/gen/dtoObjects";
import { observer } from "mobx-react-lite";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import * as style from "@/shared/css/pages/Login.module.scss"
import { LOGO_IMG_BIG } from "@shared/PUBLIC";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { paths } from "@shared/PATHS";
import { Link } from "react-router-dom";
import StoreLogin from "@/pages/Login/Store-Login";

function LoginBody({onSubmit, register, handleTest, errors}: {onSubmit: () => void, register: UseFormRegister<UserDTO>, handleTest: () => void, errors: FieldErrors<UserDTO>}) {
  // const buttonVariant = 'outlined'

  return <Paper className={style.modal}>
      {/* <div>vasya@gmail.com</div>
      <div>Добро пожаловать: {storeAuthorization.user?.email}</div> */}
      <Typography variant="h3">Войти</Typography>
      <img src={LOGO_IMG_BIG} alt="" />

      <form onSubmit={onSubmit} className={style.modal__form}>
        <InputMui text={"Почта"} id="email" error={errors.email} register={register} />
        <InputMui text={"Пароль"} id="password" type="password" error={errors.password} register={register}>
          <FormHelperText id="password">Забыли пароль?</FormHelperText>
        </InputMui>
          {/* <input {...register('email')} type="text" placeholder="email" />
          <input {...register('password')} type="text" placeholder="password" value="123" /> */}
          <Button type="submit" variant="contained">Войти</Button>
      </form>
      <Link to={paths.registration}><Button variant="contained" onClick={StoreLogin.closeModal}>Зарегистрироваться</Button></Link>

      {/* <Box display="flex" flexDirection="column">
        <button onClick={() => console.log(errors)}>Errors</button>
        <Button onClick={storeAuthorization.logout} variant={buttonVariant}>Выйти</Button>
        <Button onClick={() => console.log(storeAuthorization.user)} variant={buttonVariant}>Вывести пользователя</Button>
        <Button onClick={handleTest} variant={buttonVariant}>Запрос на проверку авторизации</Button>
        <Button onClick={storeAuthorization.initial} variant={buttonVariant}>Инициализация</Button>
      </Box> */}
    </Paper>
}

export default observer(LoginBody)