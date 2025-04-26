import Fallback from "@/Fallback"
import StoreForm from "@/store/Store-Form"
import StoreMessages from "@/store/Store-Messages"
import storeSocket from "@/store/Store-Socket"
import StoreTags from "@/store/Store-Tags"
import StoreUser from "@/store/Store-User"
import StoreUsers from "@/store/Store-Users"
import StoreLikes from "@/store/StoreLikes"
import { toSO } from "@s/infrastructure/db/Mappers"
import { toJS } from "mobx"
import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

function Layout() {
  return (
    <>
    <header>
      <Link to={"/"}><button>Главная</button></Link>
        <Link to={"/registration"}><button>Регистрация</button></Link>
        <Link to={"/login"}><button>Войти</button></Link>
        <Link to={"/messages"}><button>Сообщения</button></Link>
        <Link to={"/users"}><button>Пользователи</button></Link>
        <Link to={"/profile/36"}><button>profile 36</button></Link>
        <button onClick={() => console.log(
          'User: ', toJS(StoreUser.user),
          'Form:', toJS(StoreForm.form),
          'Messages:', toJS(StoreMessages.messages),
          'Likes:', toJS(StoreLikes.likes),
          "Tags:", toJS(StoreTags.tags),
          toJS(StoreUsers.users)
          )}>Вывести сторы</button>
        <button>Светлый</button>
        <br />
        <br />
    </header>
      
      <Outlet />
    </>
  )
}

export default Layout