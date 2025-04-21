import useGetById from "@/assets/useGetById"
import StoreUsers from "@/store/Store-Users"
import Toast from "@/ui/Toast"
import { Form } from "@s/core/domain/Users"
import { Suspense, useEffect, useRef, useState } from "react"

function Users() {
  useGetById('forms', undefined, 'array', (data: Form[]) => StoreUsers.initial(data))
  const [state, setState] = useState(false)
  const ref = useRef(null)

  return (
    <Suspense>
      <Toast state={state} nodeRef={ref} ></Toast>
      {StoreUsers.users?.map(e => (
        <>
          <div>{e.id} {e.name}</div>
          <button onClick={() => {}}>Лайкнуть</button>
          <button onClick={() => console.log(StoreUsers.users)}>Вывести стор</button>
        </>
      ))}
    </Suspense>
  )
}

export default Users