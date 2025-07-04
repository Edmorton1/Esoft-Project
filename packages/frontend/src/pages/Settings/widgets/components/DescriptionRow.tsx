import { ProfileType } from "@app/client/pages/Settings/widgets/schema/Schemas"
import { TextAreaMui } from "@app/client/shared/ui/mui_module_components/MuiComponents"
import StoreForm from "@app/client/shared/stores/Store-Form"
import { useFormContext, useWatch } from "react-hook-form"

function DescriptionRow() {
  const {register} = useFormContext<ProfileType>()

  const description = useWatch({name: "description"})

  const color = StoreForm.form?.description === description ? "primary" : "warning"
  console.log(color)

  return <TextAreaMui label="Описание" register={register} id="description" color={color} />
}

export default DescriptionRow