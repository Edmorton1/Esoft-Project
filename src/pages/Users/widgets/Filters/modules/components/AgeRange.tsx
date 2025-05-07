import useUpdateParams from "@/shared/hooks/useChangeParams"
import { ChangeEvent, useEffect, useState } from "react"
import * as style from "@/pages/Users/widgets/Filters/modules/css/Range.scss"
import useDebounceParams from "@/shared/hooks/useDebounceParams"

function AgeRange({keyName}: {keyName: "min_age" | "max_age"}) {
  // const [params, updateParams] = useUpdateParams()
  const [debParams, setDebParams] = useDebounceParams(keyName)
  const [value, setValue] = useState<string | number>(50)

  useEffect(() => {
    if (debParams) {
      setValue(debParams)
    }
  }, [debParams])

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
      const change = keyName === "min_age" ? Number(e.target.value) : 100 - Number(e.target.value)
      setValue(change);
      setDebParams(change)
  }

  return <>
    <p>{value}</p>
    <input
      value={keyName === "max_age" ? 100 - Number(value) : value}
      onChange={changeHandle}
      className={keyName === "max_age" ? style.range : ''}
      max={keyName === "min_age" ? 99 : 82}
      min={keyName === "min_age" ? 18 : 1}
      type="range" />
  </>
}

export default AgeRange