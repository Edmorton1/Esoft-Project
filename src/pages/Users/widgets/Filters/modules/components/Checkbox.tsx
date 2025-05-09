import useUpdateParams from "@/shared/hooks/useChangeParams"

interface propsInterface {
  keyName: string,
  value: string,
  children: string
}

function Checkbox({keyName, value, children}: propsInterface) {
  const [params, updateParams] = useUpdateParams()
  const handleChange = () => updateParams(keyName, value)

  return <>
    <ol>
      <input onChange={handleChange} checked={params[keyName] === value} type="checkbox" id={value || ''} /><label htmlFor={value || ''}>{children}</label>
    </ol>
  </>
}

export default Checkbox