import { Suspense } from "react"
import { observer } from "mobx-react-lite"
import UsersCardWidget from "@/pages/Users/widgets/Card/UsersCardWidget"
import UsersFilterWidget from "@/pages/Users/widgets/Filters/UsersFilterWidget"
import UserPagination from "@/pages/Users/widgets/Pagination/UserPagination"
import * as style from "@/shared/css/Users.module.scss"
// 042b5b75-f847-4f2a-b695-b5f58adc9dfd

function Users() {
  // useGeolocation()
  console.log("USERS")
  return (
    <Suspense>
      <>
        {/* <button onClick={StoreUser.logout}>Выйти</button>
        <button onClick={() => StoreGlobal.sendInfo(String(Math.random()))}>Тру</button>
        <button onClick={() => console.log(toJS(StoreGlobal.data))}>Тру</button>
        <button onClick={() => console.log(toJS(StoreLikes.likes))}>Вывести стор</button> */}
        <div className={style.main}>
          <div className={style.main__cards}>
            <UsersCardWidget />
          </div>
          <div className={style.main__filters}>
            <UsersFilterWidget />
          </div>
        </div>
        <UserPagination />
      </>
    </Suspense>
  )
}

export default observer(Users)