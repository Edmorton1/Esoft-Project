import useGeolocation from "@/shared/hooks/useGeolocation";
import RegistrationBody from "@/pages/Registration/widgets/RegistrationWidget/modules/RegistrationBody";
import { observer } from "mobx-react-lite";
import { FieldErrors, useForm } from "react-hook-form"
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { RegistrationDTOClient, RegistrationDTOClientSchema } from "@/pages/Registration/widgets/RegistrationWidget/modules/types/RegistrationZOD";
import StoreRegistration from "@/pages/Registration/widgets/RegistrationWidget/modules/stores/Store-Registration";
import StoreUser from "@/shared/stores/Store-User";

type ExtractFieldErrorType<E> = E extends FieldErrors<infer T> ? T : never

function Registration() {
  const location = useGeolocation()!
  console.log(location)
  const { register, handleSubmit, setValue, setError, formState: {errors} } = useForm({resolver: zodResolver(RegistrationDTOClientSchema)});

  useEffect(() => {
    if (location?.city) {
      setValue("city", location.city)
    }
  }, [location, setValue])

  async function registrationHandle(data: RegistrationDTOClient) {
    const isFree = await StoreRegistration.emailIsFree(data.email)
    
    if (!isFree) {
      setError("email", {
        message: "Пользователь с таким email уже существует",
        type: "manual"
      })
      return;
    }

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

  //@ts-ignore
  return <RegistrationBody register={register} onSubmit={handleSubmit(data => registrationHandle(data))} errors={errors} />
}

export default observer(Registration)