import LoginBody from "@app/client/shared/ui/modals/Login/components/LoginBody";
import StoreLogin from "@app/client/shared/ui/modals/Login/stores/Store-Login";
import StoreUser from "@app/client/shared/stores/Store-User";
import BaseModal from "@app/client/shared/ui/modals/BaseModal/BaseModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDTO, UserDTOSchema } from "@app/types/gen/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit, setError, formState: {errors}, reset } = useForm<UserDTO>({resolver: zodResolver(UserDTOSchema)});

  const navigate = useNavigate()

  const handleLogin = (data: UserDTO) => {
    StoreUser.login(data, setError, navigate, reset)
    // reset()
  }

  const onSubmit = handleSubmit((data: UserDTO) => handleLogin(data))

  return <BaseModal Store={StoreLogin}>
    <LoginBody onSubmit={onSubmit} register={register} errors={errors} />
  </BaseModal>
}

export default observer(Login)