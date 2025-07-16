import RegistrationBody from "@app/client/pages/Registration/widgets/RegistrationWidget/RegistrationBody";
import { observer } from "mobx-react-lite";
import { FormProvider, useForm } from "react-hook-form"
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { RegistrationDTOClient, RegistrationDTOClientSchema } from "@app/client/types/RegistrationZOD";
import StoreRegistration from "@app/client/pages/Registration/widgets/stores/Store-Registration";
import StoreUser from "@app/client/shared/stores/Store-User";
import { LocationDTO } from "@app/types/gen/dtoObjects";

function Registration() {
  const methods = useForm({resolver: zodResolver(RegistrationDTOClientSchema), defaultValues: {tags: []}});

  // РАБОТА С COOKIES
  useEffect(() => {
    console.log("ПЕРЕЗАПИСЫВАЕМ КУКИСЫ", StoreRegistration.cookie)
    const password = StoreRegistration.cookie?.email ? null : ""
    methods.reset({
      tags: [],
      password,
      confirmPassword: password,
      ...StoreRegistration.cookie
    })
  }, [StoreRegistration.cookie])

  // ОБНОВЛЕНИЕ КООРДИНАТ
  useEffect(() => {
    if (StoreRegistration.defaultCoords?.city) {
      methods.setValue("city", StoreRegistration.defaultCoords.city)
    }
  }, [StoreRegistration.defaultCoords])

  // ОБНОВЛЕНИЕ КООРДИНАТ
  useEffect(() => {
    if (StoreRegistration.coords?.city) {
      methods.setValue("city", StoreRegistration.coords.city)
    }
  }, [StoreRegistration.coords])

  async function registrationHandle(data: RegistrationDTOClient) {
    const isFree = await StoreRegistration.emailIsFree(data.email)
    
    if (!isFree) {
      methods.setError("email", {
        message: "Пользователь с таким email уже существует",
        type: "manual"
      })
      return;
    }

    const location: Omit<LocationDTO, 'city'> | undefined = StoreRegistration.coords ? {lng: StoreRegistration.coords.lng, lat: StoreRegistration.coords.lat} : undefined
    const form: RegistrationDTOClient = {...data, location}
    
    console.log("FORMA", form, data.avatar)
    await StoreUser.registration(form)
  }

  return <FormProvider {...methods}>
    <RegistrationBody onSubmit={methods.handleSubmit(data => registrationHandle(data))} />
  </FormProvider>
}

export default observer(Registration)