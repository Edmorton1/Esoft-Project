import StoreLogin from "@app/client/shared/ui/modals/Login/stores/Store-Login";
import * as style from "@app/client/shared/css/pages/Main/modules/wallpaper/Wallpaper.module.scss";
import * as bbstyle from "@app/client/shared/css/pages/Main/modules/wallpaper/components/BigButton.module.scss"
import { WALLPAPER_LOGO } from "@app/shared/PUBLIC";
import { useLayoutEffect, useRef } from "react";

function Wallpaper() {
	const logoref = useRef<HTMLImageElement>(null);
	useLayoutEffect(() => {
		const scrollHandle = (e: Event) => {
			const target = e.target as Document;

			const position = target.documentElement.scrollTop;
			const wallpaperHeight = window.innerHeight;

			const opacityProcent = 1 - position / wallpaperHeight;

			logoref.current!.style.opacity = String(opacityProcent);

			console.log("WALLPAPER", wallpaperHeight);
			console.log(opacityProcent);
		};

		document.addEventListener("scroll", scrollHandle);

		return () => document.removeEventListener("scroll", scrollHandle);
	}, [logoref]);

	const handleClick = () => StoreLogin.openModal();

	return (
		<section className={style.wallpaper}>
			<div ref={logoref} className={style.wallpaper__opacity}>
				<img
					src={WALLPAPER_LOGO}
					className={style["wallpaper__opacity--logo"]}
					alt=""
				/>
				<button className={bbstyle["big-button"]} onClick={handleClick}>
					Найти знакомсква
				</button>
			</div>
		</section>
	);
}

export default Wallpaper