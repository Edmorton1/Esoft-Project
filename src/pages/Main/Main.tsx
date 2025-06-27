import * as style from "@/shared/css/pages/Main/Main.module.scss";
import Information from "@/pages/Main/modules/information/Information";
import Wallpaper from "@/pages/Main/modules/wallpaper/Wallpaper";

function Main() {


	return (
		<main className={style.container}>
			<Wallpaper />
			<Information />
		</main>
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
