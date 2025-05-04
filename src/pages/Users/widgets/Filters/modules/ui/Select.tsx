import useUpdateParams from "@/shared/hooks/useChangeParams";
import { ChangeEvent, useState } from "react";

function Select() {
  const [target, setTarget] = useState(false)

  const UpdateParams = useUpdateParams()

  const inputHandle = (e: ChangeEvent<HTMLInputElement>) => UpdateParams.update('target', e.target.value)
  const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "other") {
      UpdateParams.remove('target')
      setTarget(true)
    } else {
      setTarget(false);
      UpdateParams.update('target', e.target.value)
    }
  }

  return <>
  <select onChange={selectChange} name="target" id="target">
    <option value="any">Любая</option>
    <option value="relation">Отношения</option>
    <option value="friend">Дружба</option>
    <option value="chat">Чатинг</option>
    <option value="hobby">Хобби</option>
    <option value="other">Другое</option>
  </select>
  {target && <input onChange={inputHandle} type="text" placeholder="Напишите цель..." />}
  </>
}

export default Select