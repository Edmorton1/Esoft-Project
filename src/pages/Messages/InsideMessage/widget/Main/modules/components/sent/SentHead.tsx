import { MessagesContext } from "@/pages/Messages/InsideMessage/Messages"
import SentBody from "@/pages/Messages/InsideMessage/widget/Main/modules/components/sent/SentBody"
import StoreForm from "@/shared/stores/Store-Form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageDTOClientSchema } from "@t/client/DTOClient"
import { useContext } from "react"
import { useForm } from "react-hook-form"

function SentHead({toid}: {toid: number}) {
  const StoreMessages = useContext(MessagesContext)!

  const {register, handleSubmit, reset} = useForm({resolver: zodResolver(MessageDTOClientSchema)})

  const handleSend = (data: any) => {
    const parsed = MessageDTOClientSchema.parse(data)
    StoreMessages.send(parsed, toid)
    reset({files: undefined})
  }

  return <SentBody onSubmit={handleSubmit((data) => handleSend({...data, toid: toid, fromid: StoreForm.form!.id!}))} register={register} toid={toid} />
}

export default SentHead