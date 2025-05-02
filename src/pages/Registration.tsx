import useGeolocation from "@/hooks/useGeolocation";
import FormCreate from "@/modules/Form";
import StoreForm from "@/store/Store-Form";
import StoreUser from "@/store/Store-User";
import { Form } from "@s/core/domain/Users";
import { FormDTO, UserDTO } from "@s/core/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { toCl } from "@s/infrastructure/db/Mappers";
import { AvatarHandle } from "@/modules/funcDropAva";

function Registration() {
  const location = useGeolocation()!
  console.log(location)
  const { register, handleSubmit, setValue } = useForm<UserDTO & FormDTO>();

  useEffect(() => {
    if (location?.city) {
      setValue("city", location.city)
    }
  }, [location])

  async function registrationHandle(data: UserDTO & FormDTO) {
    const {email, password, avatar, ...rawForm} = data
    const {city, ...coords} = location
    const name = rawForm.name.charAt(0).toUpperCase() + rawForm.name.slice(1).toLowerCase()
    const userid = await StoreUser.registration({email, password})
    const avatarUpload = toCl(await AvatarHandle(avatar![0]))

    // ПОТОМ userid ДОБАВИТЬ

    //@ts-ignore
    const form: Form = {...rawForm, name: name, id: userid, avatar: avatarUpload, tags: data.tags?.split(',').map(e => e.toLowerCase().trim()), location: coords}
    
    console.log(form)
    // await StoreForm.postForm(form)
  }

  return (
    <>
      <div>Добро пожаловать: {StoreUser.user?.email}</div>
      <form onSubmit={handleSubmit(data => registrationHandle(data))} style={{display: "flex", flexDirection: "column", width: "400px", gap: "10px"}}>
        <input {...register('email')} type="text" placeholder="email" />
        <input {...register('password')} type="text" placeholder="password" />
        <FormCreate register={register} />
      </form>
      <button onClick={StoreUser.logout}>Выйти</button>
      <button onClick={() => console.log(StoreUser.user)}>Вывести пользователя</button>
      <button onClick={() => console.log(StoreForm.form)}>Вывести форму</button>
    </>
  )
}

export default observer(Registration)