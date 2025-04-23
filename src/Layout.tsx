import StoreForm from "@/store/Store-Form"
import StoreMessages from "@/store/Store-Messages"
import storeSocket from "@/store/Store-Socket"
import StoreTags from "@/store/Store-Tags"
import StoreUser from "@/store/Store-User"
import StoreUsers from "@/store/Store-Users"
import StoreLikes from "@/store/StoreLikes"
import { toSO } from "@s/infrastructure/db/Mappers"
import { toJS } from "mobx"
import { Link, Outlet } from "react-router-dom"

function Layout() {
  return (
    <>
      {/* <button onClick={() => storeSocket.socket.send(frSO({ fromid: 1, toid: 2, text: 'text test' }))}>Отправить сообщение на Сокет</button> */}
      <Link to={"/"}><button>Главная</button></Link>
      <Link to={"/registration"}><button>Регистрация</button></Link>
      <Link to={"/login"}><button>Войти</button></Link>
      <Link to={"/messages"}><button>Сообщения</button></Link>
      <Link to={"/users"}><button>Пользователи</button></Link>
      <button onClick={() => console.log(
        'User: ', toJS(StoreUser.user),
        'Form:', toJS(StoreForm.form),
        'Messages:', toJS(StoreMessages.messages),
        'Likes:', toJS(StoreLikes.likes),
        "Tags:", toJS(StoreTags.tags),
        toJS(StoreUsers.users)
        )}>Вывести сторы</button>
      <br />
      <br />
      <Outlet />
    </>
  )
}

export default Layout