import $api from "@/store/api";
import storeAuthorization from "@/store/store-authorization";
import { URL_SERVER } from "@/URLS";
import { UserDTO } from "@s/core/repositories/dto/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();

  const handleLogin = async (data: UserDTO) => {
    const request = await $api.post(`${URL_SERVER}/login`, data)
    console.log(request)
  }
  
  const handleLogout = async () => {
    console.log(storeAuthorization.user)
    const request = await $api.get(`${URL_SERVER}/logout`)
    console.log(request)
  }

  return (
    <>
    <div>Добро пожаловать: {storeAuthorization.user?.email}</div>
    <form onSubmit={handleSubmit((data: UserDTO) => storeAuthorization.login(data))}>
      <input {...register('email')} type="text" placeholder="email" value="marty@gmial.ru" />
      <input {...register('password')} type="text" placeholder="password" value="123" />
      <button>Войти</button>
    </form>
    <button onClick={handleLogout}>Выйти</button>
    </>
  )
}

export default observer(Login)