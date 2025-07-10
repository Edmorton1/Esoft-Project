import LoginBody from "@app/client/shared/ui/modals/Login/modules/LoginBody";
import StoreLogin from "@app/client/shared/ui/modals/Login/stores/Store-Login";
import StoreUser from "@app/client/shared/stores/Store-User";
import BaseModal from "@app/client/shared/ui/modals/BaseModal/BaseModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDTO, UserDTOSchema } from "@app/types/gen/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, setError, formState: {errors} } = useForm<UserDTO>({resolver: zodResolver(UserDTOSchema)});

  const handleLogin = (data: UserDTO) => {
    StoreUser.login(data, setError)
    // reset()
  }

  const onSubmit = handleSubmit((data: UserDTO) => handleLogin(data))

  return <BaseModal Store={StoreLogin}>
    <LoginBody onSubmit={onSubmit} register={register} errors={errors} />
  </BaseModal>
}

export default observer(Login)