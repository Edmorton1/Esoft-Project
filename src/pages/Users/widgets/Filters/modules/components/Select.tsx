import useUpdateParams from "@/shared/hooks/useChangeParams";
import { ChangeEvent, useState } from "react";

function Select() {
  const [target, setTarget] = useState(false)

  const [params, updateParams, removeParams] = useUpdateParams()

  const inputHandle = (e: ChangeEvent<HTMLInputElement>) => updateParams('target', e.target.value)
  const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "other") {
      removeParams('target')
      setTarget(true)
    } else if (e.target.value === "any") {
      setTarget(false)
      removeParams("target")
    } else  {
      setTarget(false);
      updateParams('target', e.target.value)
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