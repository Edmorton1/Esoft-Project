import useGetById from "@/shared/hooks/useGetById"
import StoreUsers from "@/shared/store/Store-Users"
import { Suspense } from "react"
import StoreForm from "@/shared/store/Store-Form"
import StoreLikes from "@/shared/store/StoreLikes"
import { toJS } from "mobx"
import StoreGlobal from "@/shared/api/Store-Global"
import StoreUser from "@/shared/store/Store-User"
import { observer } from "mobx-react-lite"
// 042b5b75-f847-4f2a-b695-b5f58adc9dfd
function Users() {
  useGetById('forms', undefined, 'array', StoreUsers.initial)

  return (
    <Suspense>
      <>
        <button onClick={StoreUser.logout}>Выйти</button>
        <button onClick={() => StoreGlobal.sendInfo(String(Math.random()))}>Тру</button>
        <button onClick={() => console.log(toJS(StoreGlobal.data))}>Тру</button>
        <button onClick={() => console.log(toJS(StoreLikes.likes))}>Вывести стор</button>
        <br />
        <br />

        {StoreUsers.users?.map((anUser, i) => (
          <div key={i}>
            <div>{anUser.id} {anUser.name}</div>
            {!StoreLikes.likes?.sent.map(e => e.liked_userid).includes(anUser.id)
            ? !(anUser.id === StoreForm.form?.id) && <button onClick={() => StoreLikes.sendLike({userid: StoreForm.form!.id, liked_userid: anUser.id})}>Лайкнуть</button>
            : StoreForm?.form && <button onClick={() => StoreLikes.delete(anUser.id)}>Убрать лайк</button>}

          </div>
        ))}
      </>
    </Suspense>
  )
}

export default observer(Users)