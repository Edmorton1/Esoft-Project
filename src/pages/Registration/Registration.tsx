import useGeolocation from "@/shared/hooks/useGeolocation";
import RegistrationModule from "@/pages/Registration/modules/RegistrationModule";
import StoreForm from "@/shared/stores/Store-Form";
import StoreUser from "@/shared/stores/Store-User";
import { UserDTO } from "@s/core/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { toCl } from "@shared/MAPPERS";
import { AvatarHandle } from "@/pages/Registration/modules/funcs/funcDropAva";
import { FormDTOClient } from "@shared/DTOClientTypes";

function Registration() {
  const location = useGeolocation()!
  console.log(location)
  const { register, handleSubmit, setValue } = useForm<UserDTO & FormDTOClient>();

  useEffect(() => {
    if (location?.city) {
      setValue("city", location.city)
    }
  }, [location, setValue])

  async function registrationHandle(data: UserDTO & FormDTOClient) {
    const {email, password, avatar, ...rawForm} = data
    const {city, ...coords} = location
    const name = rawForm.name.charAt(0).toUpperCase() + rawForm.name.slice(1).toLowerCase()
    const userid = await StoreUser.registration({email, password})
    const avatarUpload = avatar?.length ? toCl<string>(await AvatarHandle(avatar![0] as File)) : undefined
    //@ts-ignore
    const tags = (data.tags as string)?.split(',').map(e => e.toLowerCase().trim())

    const form: FormDTOClient = {...rawForm, name: name, id: userid, avatar: avatarUpload, tags: tags, location: coords}
    
    console.log(form)
    await StoreForm.postForm(form)
  }

  return (
    <>
      <div>Добро пожаловать: {StoreUser.user?.email}</div>
      <form onSubmit={handleSubmit(data => registrationHandle(data))} style={{display: "flex", flexDirection: "column", width: "400px", gap: "10px"}}>
        <input {...register('email')} type="text" placeholder="email" />
        <input {...register('password')} type="text" placeholder="password" />
        <RegistrationModule register={register} />
      </form>
      <button onClick={StoreUser.logout}>Выйти</button>
      <button onClick={() => console.log(StoreUser.user)}>Вывести пользователя</button>
      <button onClick={() => console.log(StoreForm.form)}>Вывести форму</button>
    </>
  )
}

export default observer(Registration)