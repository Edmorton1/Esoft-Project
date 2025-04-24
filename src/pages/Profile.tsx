import useGetById from "@/hooks/useGetById"
import { useParams } from "react-router-dom"

function Profile() {
  const id = Number(useParams().id)
  const user = useGetById('forms', {id: id})
  console.log(user)

  return (
    <main>
      {id}
    </main>
  )
}

export default Profile