import CheckboxParams from "@/pages/Users/widgets/Filters/components/Checkbox"
import SelectParams from "@/pages/Users/widgets/Filters/components/Select"
import Tags from "@/pages/Users/widgets/Filters/components/Tags/Tags"
import Input from "@/pages/Users/widgets/Filters/components/Input"
import Typography from "@mui/material/Typography"
import { RadioGroupMui } from "@/shared/ui/components/MuiComponents"
import FormControlLabel from "@mui/material/FormControlLabel"
import TwinRange from "@/pages/Users/widgets/Filters/components/TwinRange"
import Paper from "@mui/material/Paper"
import * as style from "@/shared/css/pages/Users.module.scss"


function UsersFilterWidget() {
  console.log("FILTER RE")

  return <Paper component={"aside"} className={style.section__filters}>
    <Typography variant="h5">Показывать только</Typography>

    <RadioGroupMui text="Пол" id="sex">
      <FormControlLabel value="true" control={<CheckboxParams keyName="sex" value="man" />} label="Мужчина" />
      <FormControlLabel value="false" control={<CheckboxParams keyName="sex" value="woman" />} label="Женщина" />
    </RadioGroupMui>

    <FormControlLabel control={<CheckboxParams keyName="avatar" value="true" />} label="Показывать только с аватарами" />

    <TwinRange />

    <SelectParams />

    <Input label="Город" keyName="city" type="text" />

    <Tags />

    <Input label="Максимальное расстояние" keyName="max_distance" type="number" />
    <div>ДОБАВИТЬ СОРТИРОВКУ</div>
  </Paper>
}

export default UsersFilterWidget