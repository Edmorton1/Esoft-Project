import StoreUsers from "@/pages/Users/widgets/store/Store-Users"
import UsersCardModule from "@/pages/Users/widgets/Card/modules/UsersCardModule"
import { Form } from "@s/core/domain/Users"
import { createContext } from "react"

export const UsersContext = createContext<Form | null>(null)

function UsersCardWidget() {

  return <>
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