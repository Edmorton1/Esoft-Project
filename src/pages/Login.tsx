import $api from "@/store/api";
import storeAuthorization from "@/store/Store-User";
import { UserDTO } from "@s/core/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm<UserDTO>();

  const handleTest = async () => {
    const request = await $api.get(`/users`)
    console.log(request.status)
  }



  return (
    <>
    <div>Добро пожаловать: {storeAuthorization.user?.email}</div>
    <form onSubmit={handleSubmit((data: UserDTO) => storeAuthorization.login(data))}>
      {/* <input {...register('email')} type="text" placeholder="email" value="marty@gmial.ru" />
      <input {...register('password')} type="text" placeholder="password" value="123" /> */}
      <input {...register('email')} type="text" placeholder="email" value="asad" />
      <input {...register('password')} type="text" placeholder="password" value="123" />
      <button>Войти</button>
    </form>
    <button onClick={storeAuthorization.logout}>Выйти</button>
    <button onClick={() => console.log(storeAuthorization.user)}>Вывести пользователя</button>
    <button onClick={handleTest}>Запрос на проверку авторизации</button>
    <button onClick={storeAuthorization.initial}>Инициализация</button>
    </>
  )
}

export default observer(Login)