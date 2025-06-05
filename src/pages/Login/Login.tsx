import LoginBody from "@/pages/Login/LoginBody";
import $api from "@/shared/api/api";
import StoreUser from "@/shared/stores/Store-User";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDTO, UserDTOSchema } from "@t/gen/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, setError, formState: {errors} } = useForm<UserDTO>({resolver: zodResolver(UserDTOSchema)});

  const handleTest = async () => {
    const request = await $api.get(`/users`)
    console.log(request.status)
  }

  const handleLogin = (data: UserDTO) => {
    StoreUser.login(data, setError)
  }

  const onSubmit = handleSubmit((data: UserDTO) => handleLogin(data))

  return <LoginBody onSubmit={onSubmit} register={register} handleTest={handleTest} errors={errors} />
}

export default observer(Login)