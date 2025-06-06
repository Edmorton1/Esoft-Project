import UsersCardInfo from "@/pages/Users/widgets/Card/modules/components/UsersCardInfo"
import { UsersContext } from "@/pages/Users/widgets/Card/UsersCardWidget"
import StoreForm from "@/shared/stores/Store-Form"
import StoreLikes from "@/shared/stores/StoreLikes"
import { toJS } from "mobx"
import { useContext } from "react"

function UsersCardModule() {
  const context = useContext(UsersContext)!
  
  const handleLike = () => StoreLikes.likes?.sent.some(e => e.liked_userid === context!.id) ? StoreLikes.delete(context!.id) : StoreLikes.sendLike({userid: StoreForm.form!.id!, liked_userid: context.id})

  return <>
    {/* <button onClick={() => console.log(toJS(StoreLikes.likes))}>SHOW LIKES</button> */}
    <UsersCardInfo handleLike={handleLike} form={context} />
    
    {/* {!StoreLikes.likes?.sent.map(e => e.liked_userid).includes(anUser.id)
    ? !(anUser.id === StoreForm.form?.id) && <button onClick={() => StoreLikes.sendLike({userid: StoreForm.form!.id, liked_userid: anUser.id})}>Лайкнуть</button>
    : StoreForm?.form && <button onClick={() => StoreLikes.delete(anUser.id)}>Убрать лайк</button>} */}
  </>
}

export default UsersCardModule