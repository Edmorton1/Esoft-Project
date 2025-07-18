// import $api from "@app/client/shared/api/api";
// import { serverPaths } from "@app/shared/PATHS";

import StoreSocket from "@app/client/shared/api/Store-Socket";
import { toSOSe } from "@app/shared/JSONParsers";

function Test() {
	const requestPermissions = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
			stream.getTracks().forEach(track => track.stop());
			alert("Разрешения получены");
		} catch (error: any) {
			alert("Доступ запрещён или произошла ошибка: " + error.message);
		}
	};

	// return <TimeoutButton timeout={1500} onClick={() => console.log("asdasdasd")} variant="outlined">asddsaasdasd</TimeoutButton>
	return (
		<>
			<button
				onClick={() => {
					StoreSocket.socket?.send(toSOSe("ping", undefined));
					console.log("ОТПРАВЛЕН PING");
				}}>
				Тест сокета
			</button>
			<button onClick={requestPermissions} >Запросить доступ</button>
		</>
	);
}

export default Test;
