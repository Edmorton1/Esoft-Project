import FormError from "@/shared/ui/kit/FormError";
import FormControl from "@mui/material/FormControl";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { ReactElement, ReactNode } from "react";
import { Control, Controller, FieldError, UseFormRegister } from "react-hook-form";

interface inputInterface {
  text: string,
  id: string,
  error?: FieldError,
  children?: ReactNode
  register: UseFormRegister<any>,
  type?: string,
  disabled?: boolean,
  variant?: "standard" | "outlined" | "filled"
}

export function InputMui({text, id, error, register, children, disabled, type = 'text', variant = 'standard'}: inputInterface) {
  
  return <FormControl error={!!error}>
    <TextField label={text} {...register(id, {valueAsNumber: type === 'number'})} type={type} id={id} disabled={disabled} variant={variant} error={!!error} slotProps={{inputLabel: disabled !== undefined ? {shrink: disabled !== undefined} : undefined}} />
    <FormError id={id} error={error} />
    {children}
  </FormControl>
}

interface inputNumberInterface {
  text: string,
  id: string,
  error?: FieldError,
  children?: ReactNode
  register: UseFormRegister<any>,
}

export function InputNumberMui({text, id, error, register, children}: inputNumberInterface) {
  
  return <FormControl error={!!error}>
    <TextField label={text} {...register(id, {valueAsNumber: true, min: 18, max: 122})} type={"number"} id={id} variant="standard" error={!!error} />
    <FormError id={id} error={error}></FormError>
    {children}
  </FormControl>
}

interface selectInterface {
  text: string,
  id: string,
  error?: FieldError,
  children?: ReactNode
  control: Control<any>
  color?: colorTypes
}

export function Relations() {
  return <>
    <MenuItem value="relation">Отношения</MenuItem>
    <MenuItem value="friend">Дружба</MenuItem>
    <MenuItem value="chat">Чатинг</MenuItem>
    <MenuItem value="hobby">Хобби</MenuItem>
  </>
}

export function SelectMui({text, id, error, control, children, color = 'primary'}: selectInterface) {
  return <FormControl fullWidth error={!!error} color={color}>
      <InputLabel id={id}>{text}</InputLabel>
      <Controller
        name={id}
        control={control}
        // defaultValue=""
        render={({ field }) => (
          <Select labelId={id} label={text} {...field}>
            {children}
          </Select>
        )}
      />
      <FormError id={id} error={error}></FormError>
    </FormControl>
}

export type colorTypes = "error" | "primary" | "secondary" | "info" | "success" | "warning"
interface radioInterface {
  text: string,
  id: string,
  error?: FieldError,
  // children: ReactElement<FormControlLabelProps>
  children: ReactNode
  control?: Control<any>
  onChange?: (...[args]: any) => void
  color?: colorTypes
}

export function RadioGroupMui({error, text, id, children, control, onChange, color = 'primary'}: radioInterface) {
  return <FormControl color={color} sx={{display: "flex", justifyContent: "center", alignItems: "center"}} id={id} error={!!error}>
    <FormLabel sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>{text}</FormLabel>
    {control ? <Controller
      name={id}
      control={control}
      render={({field}) => (
        <RadioGroup row {...field} onChange={onChange}>
          {children}
        </RadioGroup>
      )}
    /> : (
      <RadioGroup row name={id}>
        {children}
      </RadioGroup>
    )}
    <FormError id={id} error={error}></FormError>
  </FormControl>
}

interface textareaInterface {
  label: string,
  id: string,
  error?: FieldError,
  children?: ReactNode
  register: UseFormRegister<any>,
}

export function TextAreaMui({label, error, id, register, children}: textareaInterface) {
  return <FormControl error={!!error}>
    <TextField {...register(id)} label={label} error={!!error} multiline minRows={3} id={id}/>
    <FormError id={id} error={error}></FormError>
    {children}
  </FormControl>
}