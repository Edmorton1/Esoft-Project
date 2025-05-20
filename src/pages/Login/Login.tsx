import $api from "@/shared/api/api";
import storeAuthorization from "@/shared/stores/Store-User";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { UserDTO } from "@s/core/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm<UserDTO>();

  const handleTest = async () => {
    const request = await $api.get(`/users`)
    console.log(request.status)
  }

  const buttonVariant = 'outlined'

  return (
    <>
      <div>vasya@gmail.com</div>
      <div>Добро пожаловать: {storeAuthorization.user?.email}</div>
      <form onSubmit={handleSubmit((data: UserDTO) => storeAuthorization.login(data))}>
        {/* <input {...register('email')} type="text" placeholder="email" value="marty@gmial.ru" />
        <input {...register('password')} type="text" placeholder="password" value="123" /> */}
        <input {...register('email')} type="text" placeholder="email" />
        <input {...register('password')} type="text" placeholder="password" value="123" />
        <button>Войти</button>
      </form>
      <Box display="flex" flexDirection="column">
        <Button onClick={storeAuthorization.logout} variant={buttonVariant}>Выйти</Button>
        <Button onClick={() => console.log(storeAuthorization.user)} variant={buttonVariant}>Вывести пользователя</Button>
        <Button onClick={handleTest} variant={buttonVariant}>Запрос на проверку авторизации</Button>
        <Button onClick={storeAuthorization.initial} variant={buttonVariant}>Инициализация</Button>
      </Box>
    </>
  )
}

export default observer(Login)