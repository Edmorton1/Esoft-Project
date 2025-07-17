import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { Control, Controller, FieldError } from "react-hook-form";;

const InputTest = ({ name, control, error }: {
  name: string;
  control: Control<any>;
  error?: FieldError;
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field }) => (
      <FormControl error={!!error} color="warning">
        <TextField {...field} id={name} color="warning" />
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    )}
  />
)

export default InputTest