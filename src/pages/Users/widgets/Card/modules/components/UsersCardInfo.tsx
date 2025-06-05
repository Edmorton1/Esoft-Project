import { UsersContext } from "@/pages/Users/widgets/Card/UsersCardWidget"
import StoreForm from "@/shared/stores/Store-Form"
import StoreLikes from "@/shared/stores/StoreLikes"
import { useContext } from "react"

function UsersCardInfo() {
  const context = useContext(UsersContext)!

  const handleLike = () => StoreLikes.sendLike({userid: StoreForm.form!.id!, liked_userid: context.id})

  return <>
    <button onClick={handleLike}>Лайкнуть</button>
    <img src={context.avatar!} alt="" />
    <div>Имя: {context.name}</div>
    <div>Пол: {context.sex === true ? 'Мужчина' : 'Женщина'}</div>
    <div>Возраст: {context.age}</div>
    <div>Цель: {context.target}</div>
    <div>Описание: {context.description}</div>
    <div>Город: {context.city}</div>
    <div>Тэги: {context.tags?.map(e => e.tag).join(', ')}</div>
    <div>{context.distance ? `Расстояние: ${context.distance} км` : ''}</div>
    <br />
  </>
}

export default UsersCardInfo