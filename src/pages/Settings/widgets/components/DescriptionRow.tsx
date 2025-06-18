import { ProfileType } from "@/pages/Settings/widgets/schema/Schemas"
import { TextAreaMui } from "@/shared/ui/components/MuiComponents"
import StoreForm from "@/shared/stores/Store-Form"
import { useFormContext, useWatch } from "react-hook-form"

function DescriptionRow() {
  const {register} = useFormContext<ProfileType>()

  const description = useWatch({name: "description"})

  const color = StoreForm.form?.description === description ? "primary" : "warning"
  console.log(color)

  return <TextAreaMui label="Описание" register={register} id="description" color={color} />
}

export default DescriptionRow