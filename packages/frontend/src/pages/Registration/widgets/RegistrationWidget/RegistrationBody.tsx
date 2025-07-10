import { useFormContext, useWatch } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import StoreRegistration from "@app/client/pages/Registration/widgets/stores/Store-Registration";
import { observer } from "mobx-react-lite";
import { InputMui, InputNumberMui, RadioGroupMui, SelectMui, TagsChips, TextAreaMui } from "@app/client/shared/ui/mui_module_components/MuiComponents";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MapWidget from "@app/client/shared/widgets/MapWidget/MapWidget";
import * as style from "@app/client/shared/css/pages/Registration.module.scss"
import { TagsDTO } from "@app/types/gen/dtoObjects";
import Title from "@app/client/shared/ui/mui_components/Ttile";

interface propsInterface {
  onSubmit: (...args: any[]) => any,
}

function RegistrationBody({onSubmit}: propsInterface) {
  const { register, setValue, formState: {errors}, control } = useFormContext()
  const [input, setInput] = useState('')

  const tags: TagsDTO[] = useWatch({name: 'tags'})

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
          
          <TagsChips input={input} setInput={setInput} setValue={setValue} tags={tags} />

          <TextAreaMui id="description" label="Описание" register={register} error={errors.description} />

          <TextField type="file" label="Загрузить аватар" slotProps={{inputLabel: {shrink: true}}}></TextField>

          {/* <InputMui id="city" text="Город" register={register} disabled={!!StoreRegistration.coords || !!StoreRegistration.defaultCoords} /> */}
          <InputMui error={errors.city} id="city" text="Город" register={register} disabled={!!StoreRegistration.coords?.city} />
        </Box>

        {/* <Typography variant="h4" color="warning" textAlign={"center"}>ВНИМАНИЕ! ЕСЛИ ВЫ УКАЖЕТЕ ГЕОЛОКАЦИЮ ЕЁ БУДУТ ВИДЕТЬ ВСЕ, КТО ЗАЙДЁТ НА САЙТ!</Typography> */}
        <MapWidget height="500px" width="100%" callback={(data) => StoreRegistration.setCoords(data)} />
        <Button variant="contained" type="submit">Готво</Button>
        
    </Paper>
  </section>
  </form>
}

export default observer(RegistrationBody)
