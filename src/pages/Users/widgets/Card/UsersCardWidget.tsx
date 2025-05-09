import StoreUsers from "@/pages/Users/widgets/store/Store-Users"
import UsersCardModule from "@/pages/Users/widgets/Card/modules/UsersCardModule"
import { Form } from "@s/core/domain/Users"
import { createContext } from "react"
import useGetById from "@/shared/hooks/useGetById"
import Pagination from "@/pages/Users/widgets/Pagination/UserPagination"
import useUpdateParams from "@/shared/hooks/useChangeParams"

export const UsersContext = createContext<Form | null>(null)

function UsersCardWidget() {
  const [params] = useUpdateParams()
  const page = Number(params.page) || 1
  console.log('card render')
  useGetById('forms', `sqlparams=limit 3 offset ${(page - 1) * 3}`, 'array', StoreUsers.initial)

  return <>
    {/* <Pagination /> */}
    {StoreUsers.users?.map(anUser => (
      <div key={anUser.id}>
        <UsersContext.Provider value={anUser}>
          <UsersCardModule />
        </UsersContext.Provider>
      </div>
    ))}
  </>
}

export default UsersCardWidget