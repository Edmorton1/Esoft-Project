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

function Profile() {
  const id = Number(useParams().id)
  const last_active = useLastActive(StoreForm.form?.last_active)

  useGetById(`/forms/${id}`, {returnOne: true, callback: StoreProfile.initial})

  if (StoreProfile.profile === null) {
    return <Loading />
  }

  return <section className={style.container}>
    <Box component={"div"} className={style.container__info}>
      <div>{StoreProfile.profile.id === StoreForm.form?.id ? 'Ваш аккаунт' : "Не ваш"}</div>
      <img src={StoreProfile.profile.avatar!} alt="" />
      <Box>
      <Typography><strong>Имя: </strong>{StoreProfile.profile.name}</Typography>
      <Typography><strong>Пол: </strong>{StoreProfile.profile.sex === true ? 'Мужчина' : 'Женщина'}</Typography>
      <Typography><strong>Возраст: </strong>{StoreProfile.profile.age}</Typography>
      <Typography><strong>Цель: </strong>{StoreProfile.profile.target}</Typography>
        {StoreProfile.profile.description && <Typography>
          <strong>Описание: </strong>
          <ReadMore component={StoreProfile.profile.description} len={110} />
        </Typography>}
      <Typography><strong>Город: </strong>{StoreProfile.profile.city}</Typography>
      <Typography><strong>Тэги: </strong></Typography>
      
      {StoreProfile.profile.tags?.map(e => (
        <Chip variant="outlined" key={e.tag} label={e.tag} />
      ))}

      {/* {StoreProfile.profile.distance && <Typography><strong>Расстояние: </strong>{form.distance} км</Typography>} */}
      </Box>
    </Box>
    <Typography>{StoreProfile.profile.description}</Typography>

    {/* <div>{last_active}</div>
    <div>{StoreProfile.profile.id === StoreForm.form?.id ? 'Ващ аккаунт' : "Не ваш"}</div>
    <Link to={"/settings"}>Настройки</Link>
    {StoreProfile.profile?.id} */}
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