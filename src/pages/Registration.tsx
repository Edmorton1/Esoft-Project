import FormCreate from "@/modules/Form";
import storeAuthorization from "@/store/Store-User";
import { UserDTO } from "@s/core/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form"

function Registration() {
  const { register, handleSubmit } = useForm<UserDTO>();

  return (
    <>
    <div>Добро пожаловать: {storeAuthorization.user?.email}</div>
    {/* <form onSubmit={handleSubmit((data: UserDTO) => storeAuthorization.registration(data))}> */}
    <form>
      <input {...register('email')} type="text" placeholder="email" />
      <input {...register('password')} type="text" placeholder="password" />
      <button>Зарегаться</button>
    </form>
    <button onClick={storeAuthorization.logout}>Выйти</button>
    <button onClick={() => console.log(storeAuthorization.user)}>Вывести пользователя</button>
    <FormCreate handleSubmitRegistration={handleSubmit} />
    </>
  )
}

export default observer(Registration)