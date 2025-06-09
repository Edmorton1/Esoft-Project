import { Suspense } from "react"
import StoreLikes from "@/shared/stores/StoreLikes"
import { toJS } from "mobx"
import StoreGlobal from "@/shared/api/Store-Global"
import StoreUser from "@/shared/stores/Store-User"
import { observer } from "mobx-react-lite"
import UsersCardWidget from "@/pages/Users/widgets/Card/UsersCardWidget"
import UsersFilterWidget from "@/pages/Users/widgets/Filters/UsersFilterWidget"
import UserPagination from "@/pages/Users/widgets/Pagination/UserPagination"
import useGeolocation from "@/shared/hooks/useGeolocation"
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
        <UserPagination />

        <div style={{display: "flex"}}>
          <div style={{width: "100%"}}>
            <UsersCardWidget />
          </div>
          <div style={{width: "600px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <UsersFilterWidget />
          </div>
        </div>
      </>
    </Suspense>
  )
}

export default observer(Users)