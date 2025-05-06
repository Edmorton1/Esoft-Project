import useUpdateParams from "@/shared/hooks/useChangeParams"
import { ChangeEvent, useState } from "react"
import * as style from "@/pages/Users/widgets/Filters/modules/css/Range.scss"

function AgeRange({keyName}: {keyName: "min_age" | "max_age"}) {
  const UpdateParams = useUpdateParams()
  const [value, setValue] = useState(50)

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
      const change = keyName === "min_age" ? Number(e.target.value) : 100 - Number(e.target.value)
      setValue(change);
      UpdateParams.update(keyName, change)
  }

  return <>
    <p>{value}</p>
    <input onChange={changeHandle}
      className={keyName === "max_age" ? style.range : ''}
      max={keyName === "min_age" ? 99 : 82}
      min={keyName === "min_age" ? 18 : 1}
      type="range" />
  </>
}

export default AgeRange