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
// import { oauthQueryParams } from "@app/shared/envClient";
// import { URL_SERVER } from "@app/shared/URLS";
// import { useEffect } from "react";
// import { YANDEX_BUTTON_ID } from "@app/shared/CONST";

// declare global {
//   interface Window {
//     YaAuthSuggest: any
//   }
// }

function LoginBody({onSubmit, register, errors}: {onSubmit: () => void, register: UseFormRegister<UserDTO>, errors: FieldErrors<UserDTO>}) {
  // useEffect(() => {
  //   if (!window.YaAuthSuggest) {
  //     console.log("НЕТУ YANDEX SUG")
  //     return;
  //   }

  //   window.YaAuthSuggest.init(
  //     oauthQueryParams,
  //     "https://192.168.1.125:5000",
  //     {
  //       view: "button",
  //       parentId: YANDEX_BUTTON_ID,
  //       buttonSize: 'm',
  //       buttonView: 'main',
  //       buttonTheme: 'light',
  //       buttonBorderRadius: "0",
  //       buttonIcon: 'ya',
  //     }
  //   )
  //   .then(({handler}: {handler: any}) => handler())
  //   .then((data: any) => console.log('Сообщение с токеном', data))
  //   .catch((error: any) => console.log('Обработка ошибки', error))
  // }, [])

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
      <Link to={paths.registration}><Button variant="contained" onClick={StoreLogin.closeModal}>Регистрация</Button></Link>
      {/* <div id={YANDEX_BUTTON_ID}></div> */}
    </Paper>
}

export default observer(LoginBody)
