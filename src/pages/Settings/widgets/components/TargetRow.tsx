import { ProfileType } from "@/pages/Settings/widgets/schema/Schemas"
import { SelectMui } from "@/shared/components/MuiComponents"
import StoreForm from "@/shared/stores/Store-Form"
import MenuItem from "@mui/material/MenuItem"
import { useFormContext } from "react-hook-form"

function TargetRow() {
  const {control, watch} = useFormContext<ProfileType>()

  const target = watch('target')
  const color = StoreForm.form?.target !== target ? "warning" : "primary"

  return <SelectMui control={control} text="Цель" id="target" color={color}>
    <MenuItem value="relation">Отношения</MenuItem>
    <MenuItem value="friend">Дружба</MenuItem>
    <MenuItem value="chat">Чатинг</MenuItem>
    <MenuItem value="hobby">Хобби</MenuItem>
  </SelectMui>
}

export default TargetRow