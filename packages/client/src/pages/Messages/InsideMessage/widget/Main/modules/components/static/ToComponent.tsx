// import useGetById from "@/shared/hooks/useGetBy"
// import StoreForm from "@/shared/stores/Store-Form"
// import { Message } from "@t/gen/Users"
// import { memo } from "react"

// const ToComponent = ({msg}: {msg: Message}) => {
//   // console.log("TO COMPONENT RENDER", msg.id)

//   const to = useGetById<'forms'>(`/forms?id=${msg.toid}`, {returnOne: true})
//   const from = useGetById<'forms'>(`/forms?id=${msg.fromid}`, {returnOne: true})
  
//   const datetime = `${new Date(msg.created_at!).toLocaleDateString()} ${new Date(msg.created_at!).toLocaleTimeString()}`

//   return <div>От {StoreForm.form?.id === msg.fromid ? StoreForm.form.name : from?.name} К {to?.name} {datetime}</div>
// }

// export default memo(ToComponent, (prev, next) => prev.msg.id === next.msg.id)