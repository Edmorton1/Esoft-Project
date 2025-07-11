import StoreGoogle from "@app/client/pages/Main/store/Store-Google";
import { observer } from "mobx-react-lite";

function Main() {
	console.log("GOOGLE ID", _GOOGLE_CLIENT_ID);

	const handleClick = () => StoreGoogle.enterWithGoogle();

	return (
		// <button onClick={() => StoreError.FourtyFour()}>asdasd</button>
		<main>
			<button onClick={handleClick}>Зарегаться в гугл</button>
		</main>
	);
}

export default observer(Main);
