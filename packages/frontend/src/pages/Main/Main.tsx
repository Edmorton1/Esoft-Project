import * as style from "@app/client/shared/css/pages/Main/Main.module.scss";
import Information from "@app/client/pages/Main/modules/information/Information";
import Wallpaper from "@app/client/pages/Main/modules/wallpaper/Wallpaper";
import StoreUser from "@app/client/shared/stores/Store-User";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// console.log("GISKEY", _GISKEY)

function Main() {
  const navigate = useNavigate()

  useEffect(() => {
    if (StoreUser.user) {
      navigate(`/profile/${StoreUser.user.id}`)
    }
  }, [])

  return (
    // <button onClick={() => StoreError.FourtyFour()}>asdasd</button>
    <main className={style.container}>
      <Wallpaper />
      <Information />
    </main>
  );
}

export default Main;
