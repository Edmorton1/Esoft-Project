import FormSentForm from "@/pages/Messages/widgets/manipul/modules/FormSentForm"
import StoreMessages from "@/pages/Messages/widgets/store/Store-Messages"
import StoreForm from "@/shared/stores/Store-Form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageDTOClientSchema } from "@t/client/DTOClient"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

function FormSentWidget({toid}: {toid: string}) {
  const {register, handleSubmit, setValue, formState: { errors }} = useForm({
    resolver: zodResolver(MessageDTOClientSchema),
    defaultValues: {
      toid: toid
    }
  })

  useEffect(() => {
    if (StoreForm.form?.id) {
      setValue("fromid", StoreForm.form.id)
    }
  }, [StoreForm.form?.id])

  const handleSend = (data: any) => {
    const parsed = MessageDTOClientSchema.parse(data)
    StoreMessages.send(parsed)
  }

  return <FormSentForm onSubmit={handleSubmit((data) => handleSend({...data, toid: toid, fromid: StoreForm.form!.id!}))} register={register} />
}

export default FormSentWidget