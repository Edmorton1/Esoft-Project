import useGetById from "@/shared/hooks/useGetBy"
import StoreProfile from "@/shared/stores/Store-Profile"
import { observer } from "mobx-react-lite"
import { Link, useParams } from "react-router-dom"
import FourHundredFour from "../../shared/Errors/404"
import StoreForm from "@/shared/stores/Store-Form"
import Loading from "../../shared/ui/Loading"
import useLastActive from "@/shared/hooks/useLastActive"

function Profile() {
  const id = Number(useParams().id)
  const last_active = useLastActive(StoreForm.form?.last_active)

  useGetById(`/forms?id=${id}`, {returnOne: true, callback: StoreProfile.initial})

  if (StoreProfile.profile === null) {
    return <Loading />
  }

  if (StoreProfile.profile === undefined) {
    return <FourHundredFour />
  }

  return <div>
    <div>{last_active}</div>
    <div>{StoreProfile.profile.id === StoreForm.form?.id ? 'Ващ аккаунт' : "Не ваш"}</div>
    <Link to={"/settings"}>Настройки</Link>
    {StoreProfile.profile?.id}
    {/* <input type="file" onChange={AvatarOnChange} />; */}
    <img src={StoreProfile.profile.avatar!} alt="" />
    {/* <button onClick={() => console.log(toJS(StoreProfile.profile))}>asd</button> */}
  </div>
}

export default observer(Profile)