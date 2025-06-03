import RegistrationBody from "@/pages/Registration/widgets/RegistrationWidget/modules/RegistrationBody";
import { observer } from "mobx-react-lite";
import { FieldErrors, useForm } from "react-hook-form"
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { RegistrationDTOClient, RegistrationDTOClientSchema } from "@/pages/Registration/widgets/RegistrationWidget/modules/types/RegistrationZOD";
import StoreRegistration from "@/pages/Registration/widgets/stores/Store-Registration";
import StoreUser from "@/shared/stores/Store-User";
import { LocationDTO } from "@t/gen/dtoObjects";

type ExtractFieldErrorType<E> = E extends FieldErrors<infer T> ? T : never

function Registration() {
  const { register, handleSubmit, setValue, setError, formState: {errors} } = useForm({resolver: zodResolver(RegistrationDTOClientSchema)});

  useEffect(() => {
    if (StoreRegistration.defaultCoords?.city) {
      setValue("city", StoreRegistration.defaultCoords.city)
    }
  }, [StoreRegistration.defaultCoords])

  useEffect(() => {
    if (StoreRegistration.coords?.city) {
      setValue("city", StoreRegistration.coords.city)
    }
  }, [StoreRegistration.coords])

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

    const location: Omit<LocationDTO, 'city'> | undefined = StoreRegistration.coords ? {lng: StoreRegistration.coords.lng, lat: StoreRegistration.coords.lat} : undefined
    const form: RegistrationDTOClient = {...data, location}
    
    console.log(form)
    await StoreUser.registration(form)
  }

  //@ts-ignore
  return <RegistrationBody register={register} onSubmit={handleSubmit(data => registrationHandle(data))} errors={errors} />
}

export default observer(Registration)