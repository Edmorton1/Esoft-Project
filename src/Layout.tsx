import storeSocket from "@/store/store-socket"
import { frSO } from "@s/infrastructure/db/Mappers"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <>
      {/* <button onClick={() => storeSocket.socket.send(frSO({ fromid: 1, toid: 2, text: 'text test' }))}>Отправить сообщение на Сокет</button> */}
      <br />
      <Outlet />
    </>
  )
}

export default Layout