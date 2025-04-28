import useGeolocation from "@/hooks/useGeolocation";
import FormCreate from "@/modules/Form";
import StoreForm from "@/store/Store-Form";
import StoreUser from "@/store/Store-User";
import { Form } from "@s/core/domain/Users";
import { FormDTO, UserDTO } from "@s/core/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form"
import { createContext } from "react";
import { AvatarHandle } from "@/modules/funcDropAva";
import { toCl } from "@s/infrastructure/db/Mappers";

function Registration() {
  const { register, handleSubmit } = useForm<UserDTO & FormDTO>();
  const location = useGeolocation()!

  async function registrationHandle(data: UserDTO & FormDTO) {
    const {email, password, avatar, ...rawForm} = data
    const {city, ...coords} = location
    const name = rawForm.name.charAt(0).toUpperCase() + rawForm.name.slice(1).toLowerCase()
    const userid = await StoreUser.registration({email, password})
    const avatarUpload = toCl(await AvatarHandle(avatar![0]))
    console.log(avatarUpload)
    // ПОТОМ userid ДОБАВИТЬ

    //@ts-ignore
    const form: Form = {...rawForm, name: name, id: userid, avatar: avatarUpload, tags: data.tags?.split(',').map(e => e.toLowerCase().trim()), location: coords}
    
    console.log(form)
    await StoreForm.postForm(form)
  }

  return (
    <main>
      <div>Добро пожаловать: {StoreUser.user?.email}</div>
      <form onSubmit={handleSubmit(data => registrationHandle(data))} style={{display: "flex", flexDirection: "column", width: "400px", gap: "10px"}}>
        <input {...register('email')} type="text" placeholder="email" />
        <input {...register('password')} type="text" placeholder="password" />
        <FormCreate register={register} />
      </form>
      <button onClick={StoreUser.logout}>Выйти</button>
      <button onClick={() => console.log(StoreUser.user)}>Вывести пользователя</button>
      <button onClick={() => console.log(StoreForm.form)}>Вывести форму</button>
    </main>
  )
}

export default observer(Registration)