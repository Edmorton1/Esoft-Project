import SentBody from "@/pages/Messages/InsideMessage/widget/modules/components/sent/SentBody"
import StoreMessages from "@/pages/Messages/store/Store-Messages"
import StoreForm from "@/shared/stores/Store-Form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageDTOClientSchema } from "@t/client/DTOClient"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

function SentHead({toid}: {toid: number}) {
  const {register, handleSubmit, setValue, reset} = useForm({
    resolver: zodResolver(MessageDTOClientSchema),
    defaultValues: {
      toid: toid,
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
    reset({files: undefined})
  }

  return <SentBody onSubmit={handleSubmit((data) => handleSend({...data, toid: toid, fromid: StoreForm.form!.id!}))} register={register} toid={toid} />
}

export default SentHead