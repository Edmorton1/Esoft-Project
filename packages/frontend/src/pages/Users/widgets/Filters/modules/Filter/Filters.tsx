import CheckboxParams from "@app/client/pages/Users/widgets/Filters/modules/Filter/components/Checkbox"
import SelectParams from "@app/client/pages/Users/widgets/Filters/modules/Filter/components/Select"
import Tags from "@app/client/pages/Users/widgets/Filters/modules/Filter/components/Tags/Tags"
import Input from "@app/client/pages/Users/widgets/Filters/modules/Filter/components/Input"
import Typography from "@mui/material/Typography"
import { RadioGroupMui } from "@app/client/shared/ui/mui_module_components/MuiComponents"
import FormControlLabel from "@mui/material/FormControlLabel"
import TwinRange from "@app/client/pages/Users/widgets/Filters/modules/Filter/components/TwinRange"

function Filters() {
	return (
		<>
			<Typography variant="h5">Показывать только</Typography>

			<RadioGroupMui text="Пол" id="sex">
				<FormControlLabel
					value="true"
					control={<CheckboxParams keyName="sex" value="man" />}
					label="Мужчина"
				/>
				<FormControlLabel
					value="false"
					control={<CheckboxParams keyName="sex" value="woman" />}
					label="Женщина"
				/>
			</RadioGroupMui>

			<FormControlLabel
				control={<CheckboxParams keyName="avatar" value="true" />}
				label="Показывать только с аватарами"
			/>

			<TwinRange />

			<SelectParams />

			<Input label="Город" keyName="city" type="text" />

			<Tags />

			<Input label="Максимальное расстояние в км" keyName="max_distance" type="number" />
		</>
	);
}

export default Filters;
