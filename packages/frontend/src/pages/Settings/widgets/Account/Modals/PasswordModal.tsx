import BaseModal from "@app/client/shared/ui/modals/BaseModal/BaseModal"
import StoreSettings from "@app/client/pages/Settings/widgets/store/Store-Settings"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PasswordSchema } from "@app/client/pages/Settings/widgets/schema/Schemas"
import { InputMui } from "@app/client/shared/ui/mui_module_components/MuiComponents"
import * as style from "@app/client/shared/css/modules/PasswordModal.module.scss"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { BG_PAPER } from "@app/shared/COLORS"
import { useNavigate } from "react-router-dom"
import { RegisterNames } from "@app/client/types/types"

function PasswordModal() {
  const {register, handleSubmit, formState: {errors}, setError} = useForm({resolver: zodResolver(PasswordSchema)})
  type RegType = RegisterNames<typeof register>
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    const parse = PasswordSchema.parse(data)
    console.log(parse)
    StoreSettings.comparePassword(parse.pass, parse.new, setError, navigate)
  }

  return <BaseModal Store={StoreSettings}>
    <Box bgcolor={BG_PAPER} className={style.container} component={"form"} onSubmit={handleSubmit(data => onSubmit(data))}>
      <Typography variant="h4">Сменить пароль</Typography>
      <InputMui<RegType> register={register} text="Старый пароль" id="pass" error={errors.pass} />
      <InputMui<RegType> register={register} text="Новый пароль" id="new" error={errors.new} />
      <InputMui<RegType> register={register} text="Повторите пароль" id="repeat" error={errors.repeat} />
      <Button variant="contained" type="submit">Готово</Button>
    </Box>
  </BaseModal>
}

export default PasswordModal