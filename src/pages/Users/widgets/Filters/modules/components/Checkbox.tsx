import useUpdateParams from "@/shared/hooks/useChangeParams"

function Checkbox({keyName, value, children}: {keyName: string, value: string, children: string}) {
  const [params, updateParams] = useUpdateParams()
  const handleChange = () => updateParams(keyName, value)

  return <>
    <ol>
      <input onChange={handleChange} checked={params[keyName] === value} type="checkbox" id={value || ''} /><label htmlFor={value || ''}>{children}</label>
    </ol>
  </>
}

export default Checkbox