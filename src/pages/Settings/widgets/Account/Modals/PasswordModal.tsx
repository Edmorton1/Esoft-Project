import BaseModal from "@/shared/components/BaseModal/BaseModal"
import StorePassword from "@/pages/Settings/widgets/store/Store-Password"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PasswordSchema } from "@/pages/Settings/widgets/schema/Schemas"
import { InputMui } from "@/shared/components/MuiComponents"
import { RegisterNames } from "@t/gen/types"
import * as style from "@/shared/css/modules/PasswordModal.module.scss"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"

function PasswordModal() {
  const {register, handleSubmit, formState: {errors}, setError} = useForm({resolver: zodResolver(PasswordSchema)})
  type RegType = RegisterNames<typeof register>

  const onSubmit = async (data: any) => {
    const parse = PasswordSchema.parse(data)
    console.log(parse)
    StorePassword.comparePassword(parse.pass, parse.new, setError)
  }

  return <BaseModal Store={StorePassword}>
    <form className={style.container} onSubmit={handleSubmit(data => onSubmit(data))}>
      <Typography variant="h4">Сменить пароль</Typography>
      <InputMui<RegType> register={register} text="Старый пароль" id="pass" error={errors.pass} />
      <Divider />
      <InputMui<RegType> register={register} text="Новый пароль" id="new" error={errors.new} />
      <InputMui<RegType> register={register} text="Повторите пароль" id="repeat" error={errors.repeat} />
      <Button variant="contained" type="submit">Готово</Button>
    </form>
  </BaseModal>
}

export default PasswordModal