// import $api from "@app/client/shared/api/api";
// import { serverPaths } from "@app/shared/PATHS";

import StoreSocket from "@app/client/shared/api/Store-Socket";
import { toSOSe } from "@app/shared/JSONParsers";

function Test() {

	// return <TimeoutButton timeout={1500} onClick={() => console.log("asdasdasd")} variant="outlined">asddsaasdasd</TimeoutButton>
	return <button onClick={() => {StoreSocket.socket?.send(toSOSe("ping", undefined)); console.log("ОТПРАВЛЕН PING")}}>Тест сокета</button>
}

export default Test;
