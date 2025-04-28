import useGetById from "@/hooks/useGetById"
import StoreProfile from "@/store/Store-Profile"
import { observer } from "mobx-react-lite"
import { Link, useParams } from "react-router-dom"
import FourHundredFour from "./ErrorPages/404"
import StoreForm from "@/store/Store-Form"
import Avatar from "@/modules/Avatar"

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
    <main style={{display: "flex", flexDirection: "column"}}>
      <div>{StoreProfile.profile.id === StoreForm.form?.id ? 'Ващ аккаунт' : "Не ваш"}</div>
      <Link to={"/settings"}>Настройки</Link>
      {StoreProfile.profile?.id}
      <Avatar />
      <img src={StoreForm.form!.avatar!} alt="" />
      {/* <button onClick={() => console.log(toJS(StoreProfile.profile))}>asd</button> */}
    </main>
  )
}

export default observer(Profile)