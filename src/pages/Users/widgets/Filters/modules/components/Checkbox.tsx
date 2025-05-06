import useUpdateParams from "@/shared/hooks/useChangeParams"

function Checkbox({keyName, value, children}: {keyName: string, value: string, children: string}) {
  console.log("FILTER CHECKBOX")
  const UpdateParams = useUpdateParams()

  const handleChange = () => UpdateParams.update(keyName, value)

  return <>
    <ol>
      <input onChange={handleChange} checked={UpdateParams.params[keyName] === value} type="checkbox" id={value || ''} /><label htmlFor={value || ''}>{children}</label>
    </ol>
  </>
}

export default Checkbox