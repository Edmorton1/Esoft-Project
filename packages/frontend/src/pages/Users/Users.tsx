import { Suspense } from "react"
import { observer } from "mobx-react-lite"
import UsersCardWidget from "@app/client/pages/Users/widgets/Card/UsersCardWidget"
import UsersFilterWidget from "@app/client/pages/Users/widgets/Filters/UsersFilterWidget"
import UserPagination from "@app/client/pages/Users/widgets/Pagination/UserPagination"
// 042b5b75-f847-4f2a-b695-b5f58adc9dfd
import * as style from "@app/client/shared/css/pages/Users.module.scss"

function Users() {
  // useGeolocation()
  console.log("USERS")
  return (
    <Suspense>
      {/* <Title>Пользователи</Title> */}
      <section className={style.section}>
        {/* <button onClick={StoreUser.logout}>Выйти</button>
        <button onClick={() => StoreGlobal.sendInfo(String(Math.random()))}>Тру</button>
        <button onClick={() => console.log(toJS(StoreGlobal.data))}>Тру</button>
        <button onClick={() => console.log(toJS(StoreLikes.likes))}>Вывести стор</button> */}
        <UserPagination />
        <UsersCardWidget />
        <UsersFilterWidget />
        <UserPagination />
      </section>
    </Suspense>
  )
}

export default observer(Users)