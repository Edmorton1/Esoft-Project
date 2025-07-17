import CheckboxParams from "@app/client/pages/Users/widgets/Filters/modules/Filter/components/Checkbox";
import StoreForm from "@app/client/shared/stores/Store-Form";
import { RadioGroupMui } from "@app/client/shared/ui/mui_module_components/MuiComponents";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

function Sotrting() {
	return (
		<>
			<Typography variant="h5">Сортировать по</Typography>
			<RadioGroupMui id="users-sorting" direction="column">
				<FormControlLabel
					control={<CheckboxParams keyName="order" value="age" />}
					label="Возрасту"
				/>
				{StoreForm.form?.location && (
					<FormControlLabel
						control={<CheckboxParams keyName="order" value="distance" />}
						label="Дистанции"
					/>
				)}
			</RadioGroupMui>
		</>
	);
}

export default Sotrting;
