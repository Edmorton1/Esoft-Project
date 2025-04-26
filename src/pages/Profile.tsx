import useGetById from "@/hooks/useGetById"
import StoreProfile from "@/store/Store-Profile"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import FourHundredFour from "./ErrorPages/404"

function Profile() {
  const id = Number(useParams().id)
  useGetById('forms', {id: id}, 'single', StoreProfile.initial)

  if (StoreProfile.profile === null) {
    return <></>
  }

  if (StoreProfile.profile === undefined) {
    return (
      <FourHundredFour />
    )
  }

  return (
    <main>
      <Link to={"/settings"}>Настройки</Link>
      {StoreProfile.profile?.id}
      <button onClick={() => console.log(toJS(StoreProfile.profile))}>asd</button>
    </main>
  )
}

export default observer(Profile)