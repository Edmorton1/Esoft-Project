// import * as style from "@app/client/shared/css/pages/Main/Main.module.scss";
// import Information from "@app/client/pages/Main/modules/information/Information";
// import Wallpaper from "@app/client/pages/Main/modules/wallpaper/Wallpaper";
// import StoreUser from "@app/client/shared/stores/Store-User";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { oauthQueryParams } from "@app/shared/envClient";
import { YANDEX_BUTTON_ID } from "@app/shared/CONST";

function Main() {
	// const navigate = useNavigate()

	// useEffect(() => {
	// 	if (StoreUser.user) {
	// 		navigate(`/profile/${StoreUser.user.id}`)
	// 	}
	// }, [])

  useEffect(() => {
    if (!window.YaAuthSuggest) {
      console.log("НЕТУ YANDEX SUG")
      return;
    }

    window.YaAuthSuggest.init(
      oauthQueryParams,
      "https://192.168.1.125:5000",
      {
        view: "button",
        parentId: YANDEX_BUTTON_ID,
        buttonSize: 'm',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonBorderRadius: "0",
        buttonIcon: 'ya',
      }
    )
    .then(({handler}: {handler: any}) => handler())
    .then((data: any) => console.log('Сообщение с токеном', data))
    .catch((error: any) => console.log('Обработка ошибки', error))
  }, [])

	return (
		<div id={YANDEX_BUTTON_ID}></div>
		// <main className={style.container}>
		// 	<Wallpaper />
		// 	<Information />
		// </main>
	);
}

export default Main;

// return (
// 	<>
// 		<button onClick={() => StoreError.FourtyFour()}>asdasd</button>
// 		<ModalCall></ModalCall>
// 		<FormControl>
// 			<InputLabel htmlFor="my-input">Email address</InputLabel>
// 			<Input id="my-input" aria-describedby="my-helper-text" />
// 			<FormHelperText id="my-helper-text">
// 				Well never share your email.
// 			</FormHelperText>
// 		</FormControl>
// 	</>
// );
