import useGetById from "@/shared/hooks/useGetById"
import StoreUsers from "@/pages/Users/widgets/store/Store-Users"
import { Suspense } from "react"
import StoreLikes from "@/shared/stores/StoreLikes"
import { toJS } from "mobx"
import StoreGlobal from "@/shared/api/Store-Global"
import StoreUser from "@/shared/stores/Store-User"
import { observer } from "mobx-react-lite"
import UsersCardWidget from "@/pages/Users/widgets/Card/UsersCardWidget"
import UsersFilterWidget from "@/pages/Users/widgets/Filters/UsersFilterWidget"
import Pagination from "@/pages/Users/widgets/Pagination/UserPagination"
// 042b5b75-f847-4f2a-b695-b5f58adc9dfd
function Users() {
  console.log("USERS")
  return (
    <Suspense>
      <>
        <button onClick={StoreUser.logout}>Выйти</button>
        <button onClick={() => StoreGlobal.sendInfo(String(Math.random()))}>Тру</button>
        <button onClick={() => console.log(toJS(StoreGlobal.data))}>Тру</button>
        <button onClick={() => console.log(toJS(StoreLikes.likes))}>Вывести стор</button>
        <Pagination />

        <br />
        <br />

        <div style={{display: "flex", justifyContent: "space-around"}}>
          <main>
            <UsersCardWidget />
          </main>
          <main style={{display: "flex", flexDirection: "column"}}>
            <UsersFilterWidget />
          </main>
        </div>
      </>
    </Suspense>
  )
}

export default observer(Users)