import CheckboxParams from "@app/client/pages/Users/widgets/Filters/components/Checkbox"
import SelectParams from "@app/client/pages/Users/widgets/Filters/components/Select"
import Tags from "@app/client/pages/Users/widgets/Filters/components/Tags/Tags"
import Input from "@app/client/pages/Users/widgets/Filters/components/Input"
import Typography from "@mui/material/Typography"
import { RadioGroupMui } from "@app/client/shared/ui/mui_module_components/MuiComponents"
import FormControlLabel from "@mui/material/FormControlLabel"
import TwinRange from "@app/client/pages/Users/widgets/Filters/components/TwinRange"
import Paper from "@mui/material/Paper"
import * as style from "@app/client/shared/css/pages/Users.module.scss"


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