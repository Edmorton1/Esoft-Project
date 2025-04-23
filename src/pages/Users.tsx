import useGetById from "@/assets/useGetById"
import StoreUsers from "@/store/Store-Users"
import Alert from "@/ui/Alert"
import { Suspense, useEffect, useState } from "react"
import * as style from "@/css/ToastLike.scss"
import StoreForm from "@/store/Store-Form"
import StoreLikes from "@/store/StoreLikes"
import { toJS } from "mobx"
import StoreGlobal from "@/store/Store-Global"
import StoreUser from "@/store/Store-User"

function Users() {
  useGetById('forms', undefined, 'array', StoreUsers.initial)

  return (
    <Suspense>
      <button onClick={StoreUser.logout}>Выйти</button>
      <button onClick={() => StoreGlobal.sendInfo(String(Math.random()))}>Тру</button>
      <button onClick={() => console.log(toJS(StoreGlobal.data))}>Тру</button>
      <button onClick={() => console.log(toJS(StoreLikes.likes))}>Вывести стор</button>
      <br />
      <br />

      {StoreUsers.users?.map((anUser, i) => (
        <div key={i}>
          <div>{anUser.id} {anUser.name}</div>
          <button onClick={() => StoreLikes.sendLike({userid: StoreForm.form?.id!, liked_userid: anUser.id})}>Лайкнуть</button>
        </div>
      ))}
    </Suspense>
  )
}

export default Users