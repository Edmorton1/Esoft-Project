import { useFormContext } from "react-hook-form"

function Component({row, name}: {row: string, name: string}) {
  const {register, control, watch} = useFormContext()
  console.log("ROW RERENDER")
  const asd = watch(name)

  return <>
    <p>Поле {row}</p>
    <input type="text" {...register(name)} />
  </>
}

export default Component