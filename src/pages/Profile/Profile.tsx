import useGetBy from "@/shared/hooks/useGetBy"
import StoreProfile from "@/pages/Profile/modules/stores/Store-Profile"
import { observer } from "mobx-react-lite"
import { Link, useParams } from "react-router-dom"
import FourHundredFour from "../../shared/Errors/404"
import StoreForm from "@/shared/stores/Store-Form"
import { AvatarOnChange } from "@/pages/Registration/modules/funcs/funcDropAva"
import Loading from "../../shared/ui/Loading"
import { useEffect } from "react"
import { toJS } from "mobx"

function Profile() {
  const id = Number(useParams().id)

  useGetBy(`/forms?id=${id}`, {
    returnOne: true,
    callback: StoreProfile.initial,
    qkey: ['profile', id]
  })

  // console.log(StoreProfile.profile, StoreForm.form)

  if (StoreProfile.profile === null) {
    return <Loading />
  }

  if (StoreProfile.profile === undefined) {
    return <FourHundredFour />
  }

  return (
    <main style={{display: "flex", flexDirection: "column"}}>
      <button onClick={() => console.log(toJS(StoreProfile.profile))}>Вывести профайл</button>
      <button onClick={() => StoreProfile.fetchProfile(id)}>Запрос на кэш</button>
      <div>{StoreProfile.profile.id === StoreForm.form?.id ? 'Ващ аккаунт' : "Не ваш"}</div>
      <Link to={"/settings"}>Настройки</Link>
      {StoreProfile.profile?.id}
      <img src={StoreProfile.profile.avatar!} style={{width: "400px"}} alt="" />
      {/* <button onClick={() => console.log(toJS(StoreProfile.profile))}>asd</button> */}

      <div>INFO</div>
      <br />
      {/* <input type="file" onChange={AvatarOnChange} /> */}
      <div>Имя: {StoreProfile.profile.name}</div>
      <div>Пол: {StoreProfile.profile.sex === true ? 'Мужчина' : 'Женщина'}</div>
      <div>Возраст: {StoreProfile.profile.age}</div>
      <div>Цель: {StoreProfile.profile.target}</div>
      <div>Описание: {StoreProfile.profile.description}</div>
      <div>Город: {StoreProfile.profile.city}</div>
      <div>Тэги: {StoreProfile.profile.tags?.map(e => e.tag).join(', ')}</div>
    </main>
  )
}

export default observer(Profile)