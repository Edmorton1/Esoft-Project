import FormHelperText from "@mui/material/FormHelperText";
import { InputMui} from "@app/client/shared/ui/mui_module_components/MuiComponents";
import Paper from "@mui/material/Paper";
import * as style from "@app/client/shared/css/pages/Registration.module.scss"
import { useFormContext } from "react-hook-form";

function RegTitle() {
  const { register, formState: {errors} } = useFormContext()

	return <Paper className={style.form__paper}>
		<InputMui error={errors.email} id="email" register={register} text="Почта" />

		<InputMui
			type="password"
			error={errors.password}
			id="password"
			register={register}
			text="Пароль">
			<FormHelperText id="password">Пароль должен...</FormHelperText>
		</InputMui>

		<InputMui
			type="password"
			error={errors.confirmPassword}
			id="confirmPassword"
			register={register}
			text="Повторите пароль"
		/>
	</Paper>;
}

export default RegTitle;
