import { UsersContext } from "@/pages/Users/widgets/Card/UsersCardWidget"
import { useContext } from "react"

function UsersCardInfo() {
  const context = useContext(UsersContext)!

  return <>
    <img src={context.avatar!} alt="" />
    <div>Имя: {context.name}</div>
    <div>Пол: {context.sex}</div>
    <div>Возраст: {context.age}</div>
    <div>Цель: {context.target}</div>
    <div>Описание: {context.description}</div>
    <div>Город: {context.city}</div>
    <div>Тэги: {context.tags?.map(e => e.tag).join(', ')}</div>
    <br />
  </>
}

export default UsersCardInfo