import { ProfileType } from "@app/client/pages/Settings/widgets/schema/Schemas"
import { SelectMui } from "@app/client/shared/ui/mui_module_components/MuiComponents"
import StoreForm from "@app/client/shared/stores/Store-Form"
import MenuItem from "@mui/material/MenuItem"
import { useFormContext, useWatch } from "react-hook-form"

function TargetRow() {
  const {control} = useFormContext<ProfileType>()
  console.log("TARGET ROW RERENDER")

  const target = useWatch({name: 'target'})
  const color = StoreForm.form?.target !== target ? "warning" : "primary"

  return <SelectMui control={control} text="Цель" id="target" color={color}>
    <MenuItem value="relation">Отношения</MenuItem>
    <MenuItem value="friend">Дружба</MenuItem>
    <MenuItem value="chat">Чатинг</MenuItem>
    <MenuItem value="hobby">Хобби</MenuItem>
  </SelectMui>
}

export default TargetRow