import Typography from '@mui/material/Typography';
import * as style from "@/shared/css/pages/Settings.module.scss"
import { useFormContext } from 'react-hook-form';
import { ProfileType } from '@/pages/Settings/widgets/schema/Schemas';
import { InputMui, InputNumberMui } from '@/shared/components/MuiComponents';
import StoreForm from '@/shared/stores/Store-Form';

interface propsInterface {
  name: keyof ProfileType
  label: string
}

function EditRow({name, label}: propsInterface) {
  const {register, watch, formState: {errors}} = useFormContext<ProfileType>()
  const actual = watch(name)
  const color = errors[name] ? "error" : actual !== StoreForm.form?.[name] ? "warning" : undefined

  return <div className={style.row}>
    <Typography color={color}>{label}: </Typography>
    {
      name === 'age'
      ? <InputNumberMui id={name} register={register} color={color} />
      : <InputMui id={name} register={register} color={color} disabled={name === "city" && typeof StoreForm.form?.location !== "undefined"} />
    }

  </div>
}

export default EditRow

// interface propsInterface {
//   name: keyof ProfileType
//   label: string
//   value?: any,
// }

// function EditRow({name, label, value}: propsInterface) {
//   const [edit, setEdit] = useState(false)
//   // const [localValue, setLocalValue] = useState(value ?? '')

  // const {register, watch, formState: {errors}} = useFormContext<ProfileType>()

//   const actual = watch(name)

//   const toggleClick = () => {
//     if (edit) {
//       // handleConfim()
//       setEdit(!edit)
//     }
//     setEdit(!edit)
//   }
  
//   // const handleConfim = () => {
//   //   const parse = name === 'age' ? Number(localValue) : localValue

//   //   {setValue(name, parse, {shouldValidate: true})}
//   // }
//   name === "city" && console.log('location', StoreForm.form?.location)

  // const color = errors[name] ? "error" : actual !== value ? "warning" : undefined

//   return <div className={style.row}>
    // <Typography color={color}>{label}: </Typography>
//     {edit
//       ? name === 'age'
        // ? <InputNumberMui id={name} register={register} color={color} />
        // : <InputMui id={name} register={register} color={color} disabled={name === "city" && typeof StoreForm.form?.location !== "undefined"} />
      // : <Typography color={color} >{actual}</Typography>
//     }
//     <IconButton onClick={toggleClick}>{edit ? <LibraryAddCheckIcon color={color}/> : <EditSquareIcon color={color}/>}</IconButton>
//     {/* <button onClick={() => console.log(!!errors[name], errors[name], errors)}>errors</button> */}
//   </div>
// }

// export default EditRow

//       // ? <FormControl id={name}>
//       //   <TextField color={errors[name] ? 'error' : 'primary'} onChange={e => setLocalValue(e.target.value)} value={localValue} variant='standard' type={type} />
//       //   <FormHelperText error={!!errors[name]} id={name}>{(errors[name] as FieldError)?.message}</FormHelperText>
//       // </FormControl>
