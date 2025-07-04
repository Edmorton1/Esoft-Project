import useUpdateParams from "@app/client/shared/hooks/useChangeParams"
import Radio from "@mui/material/Radio"
import Checkbox from "@mui/material/Checkbox"

interface propsInterface {
  keyName: string,
  value: string,
}

function CheckboxParams({keyName, value}: propsInterface) {
  const [params, updateParams] = useUpdateParams()
  const handleChange = () => updateParams(keyName, value)

  return <Checkbox onChange={handleChange} checked={params[keyName] === value} id={value || ''} />
}

export default CheckboxParams

  // return <>
  //   <ol>
  //     <input onChange={handleChange} checked={params[keyName] === value} type="checkbox" id={value || ''} /><label htmlFor={value || ''}>{children}</label>
  //   </ol>
  // </>