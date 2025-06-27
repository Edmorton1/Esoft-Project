import StoreLogin from "@/pages/Login/Store-Login";
import * as style from "@/shared/css/pages/Main.module.scss";
import { WALLPAPER_LOGO } from "@shared/PUBLIC";
import { useLayoutEffect, useRef } from "react";

function Main() {
	const logoref = useRef<HTMLImageElement>(null);
	useLayoutEffect(() => {
		const scrollHandle = (e: Event) => {
			const target = e.target as Document;

			const position = target.documentElement.scrollTop;
			const wallpaperHeight = window.innerHeight

			const opacityProcent = 1 - (position / wallpaperHeight)

			logoref.current!.style.opacity = String(opacityProcent)

			console.log("WALLPAPER", wallpaperHeight)
			console.log(opacityProcent);
		};

		document.addEventListener("scroll", scrollHandle);

		return () => document.removeEventListener('scroll', scrollHandle)
	}, [logoref]);

	const handleClick = () => StoreLogin.openModal()

	return (
		<main className={style.container}>
			{/* <img className={style.wallpaper} src={WALLPAPER_IMG} alt="" /> */}
			<div className={style.wallpaper}>
				<div ref={logoref} className={style.opacity}>
					<img src={WALLPAPER_LOGO} className={style.logo} alt="" />
					<button className={style['big-button']} onClick={handleClick} >Найти знакомсква</button>
				</div>
			</div>
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
