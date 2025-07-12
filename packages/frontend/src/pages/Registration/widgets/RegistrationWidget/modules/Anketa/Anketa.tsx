import StoreRegistration from "@app/client/pages/Registration/widgets/stores/Store-Registration";
import { InputMui, InputNumberMui, RadioGroupMui, SelectMui, TagsChips, TextAreaMui } from "@app/client/shared/ui/mui_module_components/MuiComponents";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MapWidget from "@app/client/shared/widgets/MapWidget/MapWidget";
import * as style from "@app/client/shared/css/pages/Registration.module.scss"
import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";
import { TagsDTO } from "@app/types/gen/dtoObjects";


function Anketa() {
  const { register, setValue, formState: {errors}, control } = useFormContext()
  const [input, setInput] = useState('')

  const tags: TagsDTO[] = useWatch({name: 'tags'})

	return <Paper className={style.form__paper}>
		<Box className={style.form__paper_anketa}>
			<InputMui error={errors.name} id="name" register={register} text="Имя" />

			<InputNumberMui error={errors.age} id="age" register={register} text="Возраст" />

			<RadioGroupMui control={control} id="sex" text="Пол" error={errors.sex}>
				<FormControlLabel value="true" control={<Radio />} label="Мужчина" />
				<FormControlLabel value="false" control={<Radio />} label="Женщина" />
			</RadioGroupMui>

			<SelectMui control={control} id="target" text="Цель" error={errors.target}>
				<MenuItem value="relation">Отношения</MenuItem>
				<MenuItem value="friend">Дружба</MenuItem>
				<MenuItem value="chat">Чатинг</MenuItem>
				<MenuItem value="hobby">Хобби</MenuItem>
			</SelectMui>

			<TagsChips input={input} setInput={setInput} setValue={setValue} tags={tags} />

			<TextAreaMui
				id="description"
				label="Описание"
				register={register}
				error={errors.description}
			/>

			<TextField
				type="file"
				label="Загрузить аватар"
				slotProps={{ inputLabel: { shrink: true } }}></TextField>

			{/* <InputMui id="city" text="Город" register={register} disabled={!!StoreRegistration.coords || !!StoreRegistration.defaultCoords} /> */}
			<InputMui
				error={errors.city}
				id="city"
				text="Город"
				register={register}
				disabled={!!StoreRegistration.coords?.city}
			/>
		</Box>

		{/* <Typography variant="h4" color="warning" textAlign={"center"}>ВНИМАНИЕ! ЕСЛИ ВЫ УКАЖЕТЕ ГЕОЛОКАЦИЮ ЕЁ БУДУТ ВИДЕТЬ ВСЕ, КТО ЗАЙДЁТ НА САЙТ!</Typography> */}
		<MapWidget height="500px" width="100%" callback={data => StoreRegistration.setCoords(data)} />
		<Button variant="contained" type="submit">
			Готво
		</Button>
	</Paper>;
}

export default Anketa;
