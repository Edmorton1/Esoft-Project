import useGetById from "@app/client/shared/hooks/useGetBy"
import StoreProfile from "@app/client/pages/Profile/stores/Store-Profile"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom"
import Title from "@app/client/shared/ui/mui_components/Ttile"
import UserInfo from "@app/client/pages/Profile/widgets/Profile/UserInfo"
import { serverPaths } from "@app/shared/PATHS"
import { z } from "zod"
import PostsHead from "@app/client/pages/Profile/widgets/Posts/PostsHead"
import Loading from "@app/client/shared/ui/components/Loading"

function Profile() {
  const id = z.coerce.number().parse(useParams().id)
  useGetById(`${serverPaths.profileGet}/${id}`, {returnOne: true, callback: StoreProfile.initial})

  if (StoreProfile.profile === null) {
    return <Loading />
  }

  return <>
    <Title>{StoreProfile.profile.name}</Title>
    <UserInfo />
    <Title>Посты пользователя</Title>
    <PostsHead />
  </>
}

export default observer(Profile)
