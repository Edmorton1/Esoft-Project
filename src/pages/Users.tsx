import useGetById from "@/assets/useGetById"
import StoreUsers from "@/store/Store-Users"
import Alert from "@/ui/Alert"
import { Suspense, useEffect, useState } from "react"
import * as style from "@/css/ToastLike.scss"
import StoreForm from "@/store/Store-Form"
import StoreLikes from "@/store/StoreLikes"
import { toJS } from "mobx"

function Users() {
  useGetById('forms', undefined, 'array', StoreUsers.initial)
  const [state, setState] = useState(false)

  return (
    <Suspense>

      <Alert state={state} setState={setState}>
        <div className={style.toast}>Вы понравились пользователю</div>
      </Alert>
      <button onClick={() => console.log(toJS(StoreLikes.likes))}>Вывести стор</button>
      <br />
      <br />

      {StoreUsers.users?.map(anUser => (
        <>
          <div>{anUser.id} {anUser.name}</div>
          {/* <button onClick={() => setState(true)}>Лайкнуть</button> */}
          <button onClick={() => StoreLikes.sendLike({userid: StoreForm.form?.id!, liked_userid: anUser.id})}>Лайкнуть</button>
        </>
      ))}
    </Suspense>
  )
}

export default Users