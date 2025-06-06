import StoreLikes from "@/shared/stores/StoreLikes"
import { FormWithDistanse } from "@t/gen/types"
import { observer } from "mobx-react-lite"

function UsersCardInfo({handleLike, form}: {handleLike: () => void, form: FormWithDistanse}) {
  return <>
    <button onClick={handleLike}>{StoreLikes.likes?.sent.some(e => e.liked_userid === form!.id) ? 'Убрать лайк' : 'Лайкнуть'}</button>
    <img src={form.avatar!} alt="" />
    <div>Имя: {form.name}</div>
    <div>Пол: {form.sex === true ? 'Мужчина' : 'Женщина'}</div>
    <div>Возраст: {form.age}</div>
    <div>Цель: {form.target}</div>
    <div>Описание: {form.description}</div>
    <div>Город: {form.city}</div>
    <div>Тэги: {form.tags?.map(e => e.tag).join(', ')}</div>
    <div>{form.distance ? `Расстояние: ${form.distance} км` : ''}</div>
    <br />
  </>
}

export default observer(UsersCardInfo)