import { ChangeEvent, useEffect, useState } from "react"
import * as style from "@app/client/pages/Users/widgets/Filters/modules/css/Range.module.scss"
import useDebounceParams from "@app/client/shared/hooks/useDebounceParams"
import classNames from "classnames"

function AgeRange({keyName}: {keyName: "min_age" | "max_age"}) {
  // const [params, updateParams] = useUpdateParams()
  const [debParams, setDebParams] = useDebounceParams(keyName)
  const [value, setValue] = useState<string | number>(50)
  const keyMin = "min_age"
  const keyMax = "max_age"

  useEffect(() => {
    if (debParams) {
      setValue(debParams)
    }
  }, [debParams])

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
      const change = keyName === keyMin ? Number(e.target.value) : 100 - Number(e.target.value)
      setValue(change);
      setDebParams(change)
  }

  return <>
    <p>{value}</p>
    <input
      value={keyName === keyMax ? 100 - Number(value) : value}
      onChange={changeHandle}
      className={classNames({[style.range]: keyName === keyMax})}
      max={keyName === keyMin ? 99 : 82}
      min={keyName === keyMin ? 18 : 1}
      type="range" />
  </>
}

export default AgeRange