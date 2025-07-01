import LoginBody from "@/pages/Login/LoginBody";
import StoreLogin from "@/pages/Login/Store-Login";
import $api from "@/shared/api/api";
import StoreUser from "@/shared/stores/Store-User";
import BaseModal from "@/shared/ui/components/BaseModal/BaseModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDTO, UserDTOSchema } from "@t/gen/dtoObjects";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit, setError, formState: {errors} } = useForm<UserDTO>({resolver: zodResolver(UserDTOSchema)});

  const navigate = useNavigate()

  const handleLogin = (data: UserDTO) => {
    StoreUser.login(data, setError, navigate)
  }

  const onSubmit = handleSubmit((data: UserDTO) => handleLogin(data))

  return <BaseModal Store={StoreLogin}>
    <LoginBody onSubmit={onSubmit} register={register} errors={errors} />
  </BaseModal>
}

export default observer(Login)