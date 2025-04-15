import $api from "@/store/api";
import storeAuthorization from "@/store/store-authorization";
import { URL_SERVER } from "@/URLS";
import { UserDTO } from "@s/core/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form"

function Registration() {
  const { register, handleSubmit } = useForm();

  const handleRegistration = async (data: UserDTO) => {
    const request = await $api.post(`/registration`, data)
    console.log(request)
  }

  return (
    <>
    <div>Добро пожаловать: {storeAuthorization.user?.email}</div>
    <form onSubmit={handleSubmit((data: UserDTO) => storeAuthorization.registration(data))}>
      <input {...register('email')} type="text" placeholder="email" />
      <input {...register('password')} type="text" placeholder="password" />
      <button>Зарегаться</button>
    </form>
    <button onClick={storeAuthorization.logout}>Выйти</button>
    <button onClick={() => console.log(storeAuthorization.user)}>Вывести пользователя</button>
    </>
  )
}

export default observer(Registration)