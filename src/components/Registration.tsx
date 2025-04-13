import $api from "@/store/api";
import { URL_SERVER } from "@/URLS";
import { UserDTO } from "@s/core/repositories/dto/dtoObjects";
import { useForm } from "react-hook-form"

function Registration() {
  const { register, handleSubmit } = useForm();

  const handleRegistration = async (data: UserDTO) => {
    const request = await $api.post(`${URL_SERVER}/registration`, data)
    console.log(request)
  }

  return (
    <>
    <form onSubmit={handleSubmit((data: UserDTO) => handleRegistration(data))}>
      <input {...register('email')} type="text" placeholder="email" />
      <input {...register('password')} type="text" placeholder="password" />
      <button>Зарегаться</button>
    </form>
    <button>Выйти</button>
    </>
  )
}

export default Registration