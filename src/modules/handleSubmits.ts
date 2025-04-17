// import $api from "@/store/api"
// import StoreForm from "@/store/Store-Form"
// import StoreUser from "@/store/Store-User"
// import { Form } from "@s/core/domain/Users"
// import { UserDTO } from "@s/core/dtoObjects"
// import { toCl } from "@s/infrastructure/db/Mappers"
// import { UseFormHandleSubmit } from "react-hook-form"

// export interface RawForm {
//   name: string,
//   surname: string,
//   sex: boolean,
//   age: number,
//   description: string,
//   target: string,
//   hood: string,
//   tags: string
// }

// const handleRegistration = async (data: UserDTO) => {
//   const request = await StoreUser.registration(data)
//   console.log(request)
// }

// const handleForm = async (data: RawForm) => {
//   const newData: Form = {...data, id: StoreUser.user?.id, tags: data.tags.split(',').map(e => e.toLowerCase().trim()), avatar: null}
//   const request = await StoreForm.postForm(newData)
//   console.log(request)
// }

// const handleAllSubmits = async (handleSubmitRegistration: UseFormHandleSubmit<UserDTO, UserDTO>, handleSubmitForm: UseFormHandleSubmit<RawForm, RawForm>, e: React.FormEvent<HTMLFormElement>) => {
//   handleSubmitRegistration(async (data) => await handleRegistration(data))(e);
//   handleSubmitForm(async (data) => await handleForm(data))(e);
// };

// export default handleAllSubmits