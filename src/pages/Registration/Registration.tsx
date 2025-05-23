import useGeolocation from "@/shared/hooks/useGeolocation";
import RegistrationModule from "@/pages/Registration/modules/RegistrationModule";
import StoreForm from "@/shared/stores/Store-Form";
import StoreUser from "@/shared/stores/Store-User";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { zodResolver } from "@hookform/resolvers/zod"
import FormError from "@/shared/ui/kit/FormError";
import { RegistrationDTOClient, RegistrationDTOClientSchema } from "@/pages/Registration/modules/zod";

function Registration() {
  const location = useGeolocation()!
  console.log(location)
  const { register, handleSubmit, setValue, formState: {errors} } = useForm({resolver: zodResolver(RegistrationDTOClientSchema)});

  useEffect(() => {
    if (location?.city) {
      setValue("city", location.city)
    }
  }, [location, setValue])

  async function registrationHandle(data: RegistrationDTOClient) {
    console.log("ПРИНЯЛ ФОРМУ1")
    let coords = undefined
    let city = undefined
    if (location) {
      ({city, ...coords} = location)
    }



    const form: RegistrationDTOClient = {...data, location: coords}
    
    console.log(form)
    await StoreUser.registration(form)
  }

const err = errors.age
  return (
    <>
      <div>Добро пожаловать: {StoreUser.user?.email}</div>
      <button onClick={() => console.log(errors)}>errors</button>
      <form onSubmit={handleSubmit(data => registrationHandle(data))} style={{display: "flex", flexDirection: "column", width: "400px", gap: "10px"}}>

        <FormControl error={!!errors.email}>
          <InputLabel htmlFor="email">email</InputLabel>
          <Input {...register('email')} type="text" id="email"/>
          <FormError id={"email"} error={errors.email}></FormError>
        </FormControl>
        
        {/* <input {...register('email')} type="text" placeholder="email" />
        {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>} */}
        
        <FormControl>
          <InputLabel htmlFor="password">password</InputLabel>
          <Input  {...register('password')} type="text" id="password" />
          <FormHelperText id="email">Пароль должен...</FormHelperText>
        </FormControl>

        <RegistrationModule register={register} />
      </form>
      <button onClick={StoreUser.logout}>Выйти</button>
      <button onClick={() => console.log(StoreUser.user)}>Вывести пользователя</button>
      <button onClick={() => console.log(StoreForm.form)}>Вывести форму</button>
    </>
  )
}

export default observer(Registration)