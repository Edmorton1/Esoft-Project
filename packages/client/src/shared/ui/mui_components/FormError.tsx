import { errorsType } from "@/shared/ui/mui_module_components/MuiComponents";
import FormHelperText from "@mui/material/FormHelperText";
import {FieldError} from "react-hook-form";

interface props {
	id: string;
	error?: errorsType;
	children?: string;
}

function isFieldError(error: any): error is FieldError {
  return error && typeof error === "object" && "type" in error;
}

function FormError({id, error, children}: props) {
  const message = isFieldError(error) ? error.message : undefined;

	return (
		<FormHelperText id={id} error={error ? true : false}>
			{message || children}
		</FormHelperText>
	);
}

export default FormError;
