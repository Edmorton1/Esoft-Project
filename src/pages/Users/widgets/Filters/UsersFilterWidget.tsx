import CheckboxParams from "@/pages/Users/widgets/Filters/modules/components/Checkbox"
import SelectParams from "@/pages/Users/widgets/Filters/modules/components/Select"
import Tags from "@/pages/Users/widgets/Filters/modules/components/Tags/Tags"
import Input from "@/pages/Users/widgets/Filters/modules/components/Input"
import Typography from "@mui/material/Typography"
import { RadioGroupMui } from "@/shared/components/MuiComponents"
import FormControlLabel from "@mui/material/FormControlLabel"
import TwinRange from "@/pages/Users/widgets/Filters/modules/components/TwinRange"


function UsersFilterWidget() {
  console.log("FILTER RE")

  return <>
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
  </>
}

export default UsersFilterWidget