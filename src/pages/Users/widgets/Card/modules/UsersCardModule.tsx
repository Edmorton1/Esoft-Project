import UsersCardInfo from "@/shared/ui/components/UsersCardInfo"
import { UsersContext } from "@/pages/Users/widgets/Card/UsersCardWidget"
import StoreForm from "@/shared/stores/Store-Form"
import StoreLikes from "@/shared/stores/StoreLikes"
import { useContext } from "react"
import Button from "@mui/material/Button"
import { observer } from "mobx-react-lite"

function UsersCardModule() {
  const context = useContext(UsersContext)!
  const liked = StoreLikes.likes?.sent.some(e => e.liked_userid === context!.id)

  const handleLike = () => StoreLikes.likes?.sent.some(e => e.liked_userid === context!.id) ? StoreLikes.delete(context) : StoreLikes.like(context)

  return <UsersCardInfo form={context}>
    {StoreForm.form?.id !== context.id && <Button color={liked ? "error" : "success"} variant="contained" onClick={handleLike}>{liked ? 'Убрать лайк' : 'Лайкнуть'}</Button>}
  </UsersCardInfo>
}

export default observer(UsersCardModule)

    {/* <button onClick={() => console.log(toJS(StoreLikes.likes))}>SHOW LIKES</button> */}
    
    
    {/* {!StoreLikes.likes?.sent.map(e => e.liked_userid).includes(anUser.id)
    ? !(anUser.id === StoreForm.form?.id) && <button onClick={() => StoreLikes.sendLike({userid: StoreForm.form!.id, liked_userid: anUser.id})}>Лайкнуть</button>
    : StoreForm?.form && <button onClick={() => StoreLikes.delete(anUser.id)}>Убрать лайк</button>} */}