import FormError from "@app/client/shared/ui/mui_components/FormError";
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
import { TagsDTO } from "@app/types/gen/dtoObjects";
import { memo, ReactNode, useCallback } from "react";
import { Control, Controller, FieldError, FieldErrorsImpl, Merge, UseFormRegister, UseFormSetValue } from "react-hook-form";
// import FormHelperText from "@mui/material/FormHelperText";

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
  color?: colorTypes,
}

export const InputMui = <T extends string>({text, id, error, register, children, disabled, type = 'text', variant = 'standard', color = 'primary'}: inputInterface<T>) => {
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

export const InputNumberMui = ({text, id, error, register, children, color}: inputNumberInterface) => {
  
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

export const Relations = () => {
  return <>
    <MenuItem value="relation">Отношения</MenuItem>
    <MenuItem value="friend">Дружба</MenuItem>
    <MenuItem value="chat">Чатинг</MenuItem>
    <MenuItem value="hobby">Хобби</MenuItem>
  </>
}

export const SelectMui = ({text, id, error, control, children, color = 'primary'}: selectInterface) => {
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
  text?: string,
  id: string,
  error?: errorsType,
  // children: ReactElement<FormControlLabelProps>
  children: ReactNode
  control?: Control<any>
  onChange?: (...[args]: any) => void
  color?: colorTypes,
  direction?: "column" | "row"
}

export const RadioGroupMui = ({error, text, id, children, control, onChange, color = 'primary', direction = "row"}: radioInterface) => {
  const radioSX = {display: "flex", flexDirection: direction}

  return <FormControl color={color} sx={{display: "flex", justifyContent: "center", alignItems: "center"}} id={id} error={!!error}>
    {text && <FormLabel>{text}</FormLabel>}
    {control ? <Controller
      name={id}
      control={control}
      render={({field}) => (
        <RadioGroup row {...field} onChange={onChange ?? field.onChange} sx={radioSX}>
          {children}
        </RadioGroup>
      )}
    /> : (
      <RadioGroup row name={id} sx={radioSX}>
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

export const TextAreaMui = ({label, error, id, register, children, color}: textareaInterface) => {
  return <FormControl error={!!error}>
    <TextField sx={{maxHeight: "103px", overflow: "auto"}} variant="filled" {...register(id)} label={label} error={!!error} multiline minRows={3} id={id} color={color} />
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

// const TagsArr = ({tags, color, handleDelete}: {tags: tagsChipsInterface['tags'], color: tagsChipsInterface['color'], handleDelete: () => void}) => (
// <Box sx={{padding: "3px", gap: "4px", display: "flex", flexWrap: "wrap", backgroundColor:"background.paper"}}>
//     {tags.map(e => <Chip
//       key={e.tag} 
//       label={e.tag} 
//       variant="outlined" 
//       color={color}
//       onDelete={handleDelete} />)}
//   </Box>
// )

type One<T extends readonly any[]> = T[number]
const TagChip = ({tag, color, handleDelete}: {tag: string, color: tagsChipsInterface['color'], handleDelete: () => void}) => (
  <Chip
      key={tag} 
      label={tag} 
      variant="outlined" 
      color={color}
      onDelete={handleDelete} />
)

const Tags = memo(({setValue, tags, e, color}: {setValue: UseFormSetValue<any>, tags: tagsChipsInterface['tags'], e: One<tagsChipsInterface['tags']>, color: tagsChipsInterface['color']}) => {
  const handleDelete = useCallback(() => setValue('tags', tags.filter(tag => tag.tag !== e.tag)), [e.tag, tags])
  return <TagChip tag={e.tag} color={color} handleDelete={handleDelete} key={e.tag} />
})

export const TagsChips = ({tags, color, input, setInput, setValue}: tagsChipsInterface) => {
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
    {tags.map(e => <Tags setValue={setValue} color={color} e={e} tags={tags} key={e.tag} />)}
  </Box>}
  </FormControl>
}