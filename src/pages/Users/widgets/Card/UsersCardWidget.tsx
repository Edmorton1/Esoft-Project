import StoreUsers from "@/pages/Users/widgets/store/Store-Users"
import UsersCardModule from "@/pages/Users/widgets/Card/modules/UsersCardModule"
import { Form } from "@s/core/domain/Users"
import { createContext } from "react"
import useGetById from "@/shared/hooks/useGetById"
import useUpdateParams from "@/shared/hooks/useChangeParams"

export const UsersContext = createContext<Form | null>(null)

function UsersCardWidget() {
  const [params] = useUpdateParams()

  const page = params.page || 1

  const tags = params.tags || ''
  const target = params.target || ''
  const city = params.city || ''
  const sex = params.sex || ''
  const min_age = params.min_age || ''
  const max_age = params.max_age || ''

  console.log(params)
  // useGetById('forms', `sqlparams=limit 3 offset ${(page - 1) * 3}`, 'array', StoreUsers.initial)

  // http://localhost:5000/users?max_age=46&min_age=40&tags=%D0%BC%D1%83%D0%B7%D0%B8%D0%BA%D0%B0&sex=woman

  // ПОТОМ СЮДА СОРТИРОВКУ age и аватар И target_custom
  // ПОТО РЕАКТ КВЕРИ И ЧЕРНОВИКИ СООБЩЕНИЙ
  // ЕЩЁ ЗАКЭШИРОВАТЬ ПОДБОР ПОЛЬЗ


  //@ts-ignore
  useGetById(`/extendedSearch?tags=${tags}&page=${page}&target=${target}&city=${city}&sex=${sex === 'man' ? 'true' : sex === 'woman' ? 'false' : ''}&min_age=${min_age}&max_age=${max_age}`, 'array', StoreUsers.initial)

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