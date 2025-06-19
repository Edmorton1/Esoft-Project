import StoreUsers from "@/pages/Users/widgets/store/Store-Users"
import UsersCardModule from "@/pages/Users/widgets/Card/modules/UsersCardModule"
import { createContext } from "react"
import useGetById from "@/shared/hooks/useGetBy"
import useUpdateParams from "@/shared/hooks/useChangeParams"
import { FormWithDistanse } from "@t/gen/types"
import StoreForm from "@/shared/stores/Store-Form"
import { observer } from "mobx-react-lite"
import { toJSON } from "@shared/MAPPERS"
import * as style from "@/shared/css/pages/Users.module.scss"

export const UsersContext = createContext<FormWithDistanse | null>(null)

function UsersCardWidget() {
  const [params] = useUpdateParams()

  const page = params.page || 1

  const tags = params.tags || ''
  const target = params.target || ''
  const city = params.city || ''
  const sex = params.sex || ''
  const min_age = params.min_age || ''
  const max_age = params.max_age || ''
  const avatar = params.avatar || ''
  const name = params.name || ''

  const location = toJSON([StoreForm.form?.location?.lng, StoreForm.form?.location?.lat])

  const max_distance = params.max_distance || ''

  console.log(params)

  // http://localhost:5000/users?max_age=46&min_age=40&tags=%D0%BC%D1%83%D0%B7%D0%B8%D0%BA%D0%B0&sex=woman

  useGetById(`/extendedSearch?name=${name}&tags=${tags}&page=${page}&target=${target}&city=${city}&sex=${sex === 'man' ? 'true' : sex === 'woman' ? 'false' : ''}&min_age=${min_age}&max_age=${max_age}&avatar=${avatar}&location=${location}&max_distance=${max_distance}`, {callback: StoreUsers.initial})
  console.log(`/extendedSearch?name=${name}&tags=${tags}&page=${page}&target=${target}&city=${city}&sex=${sex === 'man' ? 'true' : sex === 'woman' ? 'false' : ''}&min_age=${min_age}&max_age=${max_age}&avatar=${avatar}&location=${location}&max_distance=${max_distance}`)

  // useEffect(() => {

  // }, [])
  
  return <section className={style.section__users}>
    {StoreUsers.users?.map(anUser => (
        <UsersContext.Provider key={anUser.id} value={anUser}>
          <UsersCardModule />
        </UsersContext.Provider>
    ))}
  </section>
}

export default observer(UsersCardWidget)