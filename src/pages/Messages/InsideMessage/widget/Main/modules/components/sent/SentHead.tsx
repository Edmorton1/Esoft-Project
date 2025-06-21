import SentBody from "@/pages/Messages/InsideMessage/widget/Main/modules/components/sent/SentBody"
import StoreMessages from "@/pages/Messages/store/Store-Messages"
import StoreForm from "@/shared/stores/Store-Form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageDTOClientSchema } from "@t/client/DTOClient"
import { useForm } from "react-hook-form"

function SentHead({toid}: {toid: number}) {
  const {register, handleSubmit, reset} = useForm({resolver: zodResolver(MessageDTOClientSchema)})

  const handleSend = (data: any) => {
    const parsed = MessageDTOClientSchema.parse(data)
    StoreMessages.send(parsed, toid)
    reset({files: undefined})
  }

  return <SentBody onSubmit={handleSubmit((data) => handleSend({...data, toid: toid, fromid: StoreForm.form!.id!}))} register={register} toid={toid} />
}

export default SentHead