import StoreForm from "@/shared/stores/Store-Form"
import StoreMessages from "@/pages/Messages/widgets/modules/store/Store-Messages"
import StoreTags from "@/shared/stores/Store-Tags"
import StoreUser from "@/shared/stores/Store-User"
import StoreUsers from "@/pages/Users/widgets/store/Store-Users"
import StoreLikes from "@/shared/stores/StoreLikes"
import { toJS } from "mobx"
import { Link, NavLink, Outlet } from "react-router-dom"
import ThemeButton from "@/shared/components/ThemeButton"
import { paths } from "@shared/PATHS"
import * as style from "@/shared/css/Shared.scss"

function Header() {
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
        <ThemeButton />
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

export default Header