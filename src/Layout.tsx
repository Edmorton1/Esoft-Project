import Fallback from "@/Fallback"
import StoreForm from "@/store/Store-Form"
import StoreMessages from "@/store/Store-Messages"
import storeSocket from "@/store/Store-Socket"
import StoreTags from "@/store/Store-Tags"
import StoreUser from "@/store/Store-User"
import StoreUsers from "@/store/Store-Users"
import StoreLikes from "@/store/StoreLikes"
import { toJS } from "mobx"
import { Link, NavLink, Outlet } from "react-router-dom"
import Theme from "./ui/Theme"
import { paths } from "@shared/PATHS"
import * as style from "@/css/Shared.scss"

function Layout() {
  return (
    <>
    <header>
      <nav>
        <NavLink to={"/"}>{({ isActive }) => <button className={isActive ? style.active : ''}>Главная</button>}</NavLink>
        <Link to={paths.registration}><button>Регистрация</button></Link>
        <Link to={paths.login}><button>Войти</button></Link>
        <Link to={paths.messages}><button>Сообщения</button></Link>
        <Link to={paths.users}><button>Пользователи</button></Link>
        <Link to={`${paths.profile}/2`}><button>profile 2</button></Link>
        <button onClick={() => console.log(
          'User: ', toJS(StoreUser.user),
          'Form:', toJS(StoreForm.form),
          'Messages:', toJS(StoreMessages.messages),
          'Likes:', toJS(StoreLikes.likes),
          "Tags:", toJS(StoreTags.tags),
          toJS(StoreUsers.users)
          )}>Вывести сторы
        </button>
        <Theme />
      </nav>
        <br />
        <br />
    </header>
      
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout