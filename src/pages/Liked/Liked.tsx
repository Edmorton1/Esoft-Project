import UsersCardInfo from "@/shared/components/UsersCardInfo"
import useGetBy from "@/shared/hooks/useGetBy"
import StoreForm from "@/shared/stores/Store-Form"
import StoreLikes from "@/shared/stores/StoreLikes"
import { paths, serverPaths } from "@shared/PATHS"
import { Link } from "react-router-dom"

function Liked() {
  useGetBy(`${serverPaths.likesGet}/2?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}`, {callback: (data) => StoreLikes.likedUser(data)})

  // const handleWrite = () => {}

  return <>
    {StoreLikes.liked?.map(e => <>
      <UsersCardInfo handleLike={() => console.log('asdasdasd')} form={e} key={e.id} />
      <Link to={`${paths.messages}/${e.id}`}><button>Написать</button></Link>
      <button>Отклонить</button>
    </>)}
  </>
}

export default Liked