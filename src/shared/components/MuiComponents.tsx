import FormError from "@/shared/ui/kit/FormError";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { TagsDTO } from "@t/gen/dtoObjects";
import { ReactNode } from "react";
import { Control, Controller, FieldError, FieldErrorsImpl, Merge, UseFormRegister, UseFormSetValue } from "react-hook-form";

export type colorTypes = "error" | "primary" | "secondary" | "info" | "success" | "warning"

export type errorsType = FieldError | Merge<FieldError, FieldErrorsImpl<any>>

interface inputInterface<T> {
  text?: string,
  id: T,
  error?: errorsType,
  children?: ReactNode
  register: UseFormRegister<any>,
  type?: string,
  disabled?: boolean,
  variant?: "standard" | "outlined" | "filled",
  color?: colorTypes
}

export function InputMui <T extends string>({text, id, error, register, children, disabled, type = 'text', variant = 'standard', color = 'primary'}: inputInterface<T>) {
  
  return <FormControl error={!!error} color={color} >
    <TextField color={color} label={text} {...register(id, {valueAsNumber: type === 'number'})} type={type} id={id} disabled={disabled} variant={variant} error={!!error} slotProps={{inputLabel: disabled !== undefined ? {shrink: disabled !== undefined} : undefined}} />
    <FormError id={id} error={error} />
    {children}
  </FormControl>
}

interface inputNumberInterface {
  text?: string,
  id: string,
  error?: errorsType,
  children?: ReactNode
  register: UseFormRegister<any>,
  color?: colorTypes
}

export function InputNumberMui({text, id, error, register, children, color}: inputNumberInterface) {
  
  return <FormControl error={!!error} color={color}>
    <TextField color={color} label={text} {...register(id, {valueAsNumber: true, min: 18, max: 122})} type={"number"} id={id} variant="standard" error={!!error} />
    <FormError id={id} error={error}></FormError>
    {children}
  </FormControl>
}

interface selectInterface {
  text: string,
  id: string,
  error?: errorsType,
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

interface radioInterface {
  text: string,
  id: string,
  error?: errorsType,
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
        <RadioGroup row {...field} onChange={onChange ?? field.onChange}>
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
  error?: errorsType,
  children?: ReactNode
  register: UseFormRegister<any>,
  color?: colorTypes
}

export function TextAreaMui({label, error, id, register, children, color}: textareaInterface) {
  return <FormControl error={!!error}>
    <TextField {...register(id)} label={label} error={!!error} multiline minRows={3} id={id} color={color} />
    <FormError id={id} error={error}></FormError>
    {children}
  </FormControl>
}

interface tagsChipsInterface {
  tags: TagsDTO[],
  color?: colorTypes,
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setValue: UseFormSetValue<any>,
}

export function TagsChips({tags, color, input, setInput, setValue}: tagsChipsInterface) {
  return <FormControl fullWidth>
  <FormLabel>Тэги</FormLabel>
  <Box sx={{display: "flex", gap: 1}}>
    <TextField color={color} label="Напишите тег" variant="outlined" value={input} onChange={e => setInput(e.target.value)} sx={{ flex: 1 }} />
    <Button color={color} variant="contained" onClick={() => {
    if (input.trim() !== '' && !tags.map(e => e.tag).includes(input)) {
      setValue('tags', [...tags, {tag: input.trim()}]);
      setInput('')
    }
  }}>Добавить</Button>
  </Box>
  {tags.length > 0 && <Box sx={{padding: "3px", gap: "4px", display: "flex", flexWrap: "wrap", backgroundColor:"background.paper"}}>
    {tags.map(e => <Chip
      key={e.tag} 
      label={e.tag} 
      variant="outlined" 
      color={color}
      onDelete={() => setValue('tags', tags.filter(tag => tag.tag !== e.tag))} />)}
  </Box>}
  </FormControl>
}