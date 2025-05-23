import FormHelperText from "@mui/material/FormHelperText";
import { FieldError } from "react-hook-form";

interface props {
  id: string,
  error: FieldError | undefined,
  children?: string
}

function FormError({id, error, children}: props) {
  return <FormHelperText id={id} error={error ? true : false}>{error?.message || children}</FormHelperText>
}

export default FormError