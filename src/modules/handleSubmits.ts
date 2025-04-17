import $api from "@/store/api"
import StoreUser from "@/store/Store-User"
import { Form } from "@s/core/domain/Users"
import { UserDTO } from "@s/core/dtoObjects"
import { UseFormHandleSubmit } from "react-hook-form"

export interface RawForm {
  name: string,
  surname: string,
  sex: boolean,
  age: number,
  description: string,
  target: string,
  hood: string,
  tags: string
}

const handleRegistration = async (data: UserDTO) => {
  const request = await $api.post(`/registration`, data)
  console.log(request)
}

const handleForm = async (data: RawForm) => {
  const newData: Form = {...data, id: StoreUser.user.id, tags: data.tags.split(',').map(e => e.toLowerCase().trim()), avatar: null}
  // StoreForm.postForm(newData)
  console.log(newData)
}

const handleAllSubmits = (handleSubmitRegistration: UseFormHandleSubmit<UserDTO, UserDTO>, handleSubmitForm: UseFormHandleSubmit<RawForm, RawForm>, e: React.FormEvent<HTMLFormElement>) => {
  handleSubmitRegistration((data) => handleRegistration(data))(e);
  handleSubmitForm((data) => handleForm(data))(e);
};

export default handleAllSubmits