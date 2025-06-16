import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { RegistrationDTOClient } from "@t/client/RegistrationZOD";
import StoreRegistration from "@/pages/Registration/widgets/stores/Store-Registration";
import { observer } from "mobx-react-lite";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { InputMui, InputNumberMui, RadioGroupMui, SelectMui, TextAreaMui } from "@/shared/components/MuiComponents";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MapWidget from "@/shared/widgets/MapWidget/MapWidget";
import * as style from "@/shared/css/pages/Registration.module.scss"

interface propsInterface {
  register: UseFormRegister<RegistrationDTOClient>,
  onSubmit: (...args: any[]) => any,
  errors: FieldErrors<RegistrationDTOClient>
  control: Control<RegistrationDTOClient>
  watch: UseFormWatch<RegistrationDTOClient>
  setValue: UseFormSetValue<RegistrationDTOClient>
}

function RegistrationBody({register, onSubmit, errors, control, watch, setValue}: propsInterface) {
  const [input, setInput] = useState('')
  // const {setValue} = useFormContext<RegistrationDTOClient>()

  const Title = ({children}: {children: string}) => <Typography variant="h3" component={"h3"} align="center">{children}</Typography>
  const tags = watch('tags')

  return <form onSubmit={onSubmit} className={style.form}>
  {/* <button onClick={() => console.log(errors)}>errors</button> */}
  {/* <div>Добро пожаловать: {StoreUser.user?.email}</div>
  <button onClick={() => console.log(errors)}>errors</button>
  <button onClick={() => console.log(toJS(StoreRegistration.defaultCoords), toJS(StoreRegistration.coords))}>LOG</button> */}
  {/* <button onClick={() => StoreRegistration.setDefaultCoords({city: "asdasd", lng: 123, lat: 123})}>sadasd</button> */}
  <section>
    <Title>Регистрация</Title>

    <Paper className={style.form__paper}>
        <InputMui error={errors.email} id="email" register={register} text="Почта" />

        <InputMui type="password" error={errors.password} id="password" register={register} text="Пароль">
          <FormHelperText id="password">Пароль должен...</FormHelperText>
        </InputMui>

        <InputMui type="password" error={errors.confirmPassword} id="confirmPassword" register={register} text="Повторите пароль" />
    </Paper>
  </section>

  <section>
    <Title>Анкета</Title>

      {/* <button onClick={StoreUser.logout}>Выйти</button>
      <button onClick={() => console.log(StoreUser.user)}>Вывести пользователя</button>
      <button onClick={() => console.log(StoreForm.form)}>Вывести форму</button> */}
    <Paper className={style.form__paper}>

        <Box className={style.form__paper_anketa}>
          <InputMui error={errors.name} id="name" register={register} text="Имя" />

          <InputNumberMui error={errors.age} id="age" register={register} text="Возраст" />

          <RadioGroupMui control={control} id="sex" text="Пол" error={errors.sex} >
            <FormControlLabel value="true" control={<Radio/>} label="Мужчина" />
            <FormControlLabel value="false" control={<Radio/>} label="Женщина" />
          </RadioGroupMui>
            
          <SelectMui control={control} id="target" text="Цель" error={errors.target}>
            <MenuItem value="relation">Отношения</MenuItem>
            <MenuItem value="friend">Дружба</MenuItem>
            <MenuItem value="chat">Чатинг</MenuItem>
            <MenuItem value="hobby">Хобби</MenuItem>
          </SelectMui>

          {/* {target && <input {...register('targetCustom')} type="text" placeholder="Напишите свою цель..." />} */}
          
          <FormControl>
            <FormLabel>Тэги</FormLabel>
            <Box sx={{display: "flex", gap: 1}}>
              <TextField label="Напишите тег" variant="outlined" value={input} onChange={e => setInput(e.target.value)} sx={{ flex: 1 }} />
              <Button variant="contained" onClick={() => {
                if (input.trim() !== '' && !tags.map(e => e.tag).includes(input)) {
                  setValue('tags', [...tags, {tag: input.trim()}]);
                  setInput('')
                }
              }}>Добавить</Button>
            </Box>
            {tags.length > 0 && <Box sx={{padding: "3px", gap: "4px", display: "flex", flexWrap: "wrap", backgroundColor:"background.alt"}}>
              {tags.map(e => <Chip 
                key={e.tag} 
                label={e.tag} 
                variant="outlined" 
                onDelete={() => setValue('tags', tags.filter(tag => tag.tag !== e.tag))} />)}
            </Box>}
          </FormControl>

          <TextAreaMui id="description" label="Описание" register={register} error={errors.description} />

          <TextField type="file" label="Загрузить аватар" slotProps={{inputLabel: {shrink: true}}}></TextField>

          <InputMui id="city" text="Город" register={register} disabled={!!StoreRegistration.coords || !!StoreRegistration.defaultCoords} />
        </Box>

        <MapWidget height="1000px" width="100%" callback={(data) => StoreRegistration.setCoords(data)} />
        <Button variant="contained" type="submit">Готво</Button>
        
    </Paper>
  </section>
  </form>
}

export default observer(RegistrationBody)
