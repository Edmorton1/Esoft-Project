import useGetById from "@/shared/hooks/useGetBy"
import StoreProfile from "@/pages/Profile/stores/Store-Profile"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom"
import StoreForm from "@/shared/stores/Store-Form"
import Loading from "../../shared/ui/Loading"
import useLastActive from "@/shared/hooks/useLastActive"
import Box from "@mui/material/Box"
import * as style from "@/shared/css/pages/Profile.module.scss"
import Typography from "@mui/material/Typography"
import ReadMore from "@/shared/ui/components/ReadMore"
import Chip from "@mui/material/Chip"
import PostsHead from "@/pages/Profile/Posts/PostsHead"
import Title from "@/shared/ui/Ttile"
import UserInfo from "@/pages/Profile/widgets/UserInfo/UserInfo"
import { serverPaths } from "@shared/PATHS"

function Profile() {
  const id = Number(useParams().id)
  const last_active = useLastActive(StoreForm.form?.last_active)
  console.log("/forms", `/${serverPaths.forms}`)

  useGetById(`${serverPaths.profileGet}/${id}`, {returnOne: true, callback: StoreProfile.initial})

  if (StoreProfile.profile === null) {
    return <Loading />
  }

  return <section className={style.container}>
    <Title>{StoreProfile.profile.name}</Title>
    <UserInfo />
    <Title>Посты пользователя</Title>
    <PostsHead />
  </section>
}

export default observer(Profile)

  // return <section>
  //   <div>{last_active}</div>
    // <div>{StoreProfile.profile.id === StoreForm.form?.id ? 'Ващ аккаунт' : "Не ваш"}</div>
  //   <Link to={"/settings"}>Настройки</Link>
  //   {StoreProfile.profile?.id}
  //   {/* <input type="file" onChange={AvatarOnChange} />; */}
  //   <img src={StoreProfile.profile.avatar!} alt="" />
  //   {/* <button onClick={() => console.log(toJS(StoreProfile.profile))}>asd</button> */}
  // </section>