import storeSocket from "@/store/store-socket"
import { frSO } from "@s/infrastructure/db/Mappers"
import { Link, Outlet } from "react-router-dom"

function Layout() {
  return (
    <>
      {/* <button onClick={() => storeSocket.socket.send(frSO({ fromid: 1, toid: 2, text: 'text test' }))}>Отправить сообщение на Сокет</button> */}
      <Link to={"/"}><button>Главная</button></Link>
      <Link to={"/registration"}><button>Регистрация</button></Link>
      <Link to={"/login"}><button>Войти</button></Link>
      <Link to={"/messages"}><button>Сообщения</button></Link>
      <br />
      <br />
      <Outlet />
    </>
  )
}

export default Layout