import useUpdateParams from "@app/client/shared/hooks/useChangeParams";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function SelectParams() {
  const key = "target"
  const [params, updateParams, removeParams] = useUpdateParams()

  const selectChange = (e: SelectChangeEvent) => {
    if (e.target.value === "any") {
      removeParams(key)
    } else  {
      updateParams(key, e.target.value)
    }
  }

  return <FormControl fullWidth>
    <InputLabel id="target">Цель</InputLabel>
    <Select
      labelId="target"
      value={params.target || "any"}
      label="Цель"
      onChange={selectChange}
      defaultValue="any"
    >
      <MenuItem value="any">Любая</MenuItem>
      <MenuItem value="relation">Отношения</MenuItem>
      <MenuItem value="friend">Дружба</MenuItem>
      <MenuItem value="chat">Чатинг</MenuItem>
      <MenuItem value="hobby">Хобби</MenuItem>
    </Select>
  </FormControl>
}

export default SelectParams
