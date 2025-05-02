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

function Layout() {
  return (
    <>
    <header>
      <nav>
        <NavLink to={"/"}><button className="active">Главная</button></NavLink>
        <Link to={"/registration"}><button>Регистрация</button></Link>
        <Link to={"/login"}><button>Войти</button></Link>
        <Link to={"/messages"}><button>Сообщения</button></Link>
        <Link to={"/users"}><button>Пользователи</button></Link>
        <Link to={"/profile/2"}><button>profile 2</button></Link>
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