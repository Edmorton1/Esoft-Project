import useGetById from "@/shared/hooks/useGetById"
import StoreProfile from "@/shared/store/Store-Profile"
import { observer } from "mobx-react-lite"
import { Link, useParams } from "react-router-dom"
import FourHundredFour from "../../shared/Errors/404"
import StoreForm from "@/shared/store/Store-Form"
import { AvatarOnChange } from "@/pages/Registration/modules/funcs/funcDropAva"
import Loading from "../../shared/ui/Loading"

function Profile() {
  const id = Number(useParams().id)
  useGetById('forms', {id: id}, 'single', StoreProfile.initial)

  if (StoreProfile.profile === null) {
    return <Loading />
  }

  if (StoreProfile.profile === undefined) {
    return <FourHundredFour />
  }

  return (
    <main style={{display: "flex", flexDirection: "column"}}>
      <div>{StoreProfile.profile.id === StoreForm.form?.id ? 'Ващ аккаунт' : "Не ваш"}</div>
      <Link to={"/settings"}>Настройки</Link>
      {StoreProfile.profile?.id}
      <input type="file" onChange={AvatarOnChange} />;
      <img src={StoreProfile.profile.avatar!} alt="" />
      {/* <button onClick={() => console.log(toJS(StoreProfile.profile))}>asd</button> */}
    </main>
  )
}

export default observer(Profile)