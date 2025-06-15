import EditSquareIcon from '@mui/icons-material/EditSquare';
import Typography from '@mui/material/Typography';
import * as style from "@/shared/css/pages/Settings.module.scss"
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FieldError, useFormContext } from 'react-hook-form';
import { ProfileType } from '@/pages/Settings/widgets/schema/Schemas';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

interface propsInterface {
  name: keyof ProfileType
  label: string
  value?: any,
}

function EditRow({name, label, value}: propsInterface) {
  const [edit, setEdit] = useState(false)
  const [localValue, setLocalValue] = useState(value ?? '')

  const {setValue, formState: {errors}} = useFormContext<ProfileType>()

  const toggleClick = () => {
    if (edit) {
      handleConfim()
      setEdit(!edit)
    }
    setEdit(!edit)
  }
  
  const handleConfim = () => {
    const parse = name === 'age' ? Number(localValue) : localValue

    {parse !== value && setValue(name, parse, {shouldValidate: true})}
  }

  const color = errors[name] ? "error" : localValue !== value ? "warning" : "inherit"

  return <div className={style['container__form--row']}>
    <Typography color={color}>{label}: </Typography>
    {edit
      ? <FormControl id={name}>
        {name === 'age'
          ? <TextField color={errors[name] ? 'error' : 'primary'} onChange={e => setLocalValue(e.target.value)} value={localValue} variant='standard' type='number'/>
          : <TextField color={errors[name] ? 'error' : 'primary'} onChange={e => setLocalValue(e.target.value)} value={localValue} variant='standard' />
        }
        <FormHelperText error={!!errors[name]} id={name}>{(errors[name] as FieldError)?.message}</FormHelperText>
      </FormControl>
      : <Typography color={color} >{localValue}</Typography>
    }
    <IconButton onClick={toggleClick}>{edit ? <LibraryAddCheckIcon color={color}/> : <EditSquareIcon color={color}/>}</IconButton>
    {/* <button onClick={() => console.log(!!errors[name], errors[name], errors)}>errors</button> */}
  </div>
}

export default EditRow

      // ? <FormControl id={name}>
      //   <TextField color={errors[name] ? 'error' : 'primary'} onChange={e => setLocalValue(e.target.value)} value={localValue} variant='standard' type={type} />
      //   <FormHelperText error={!!errors[name]} id={name}>{(errors[name] as FieldError)?.message}</FormHelperText>
      // </FormControl>