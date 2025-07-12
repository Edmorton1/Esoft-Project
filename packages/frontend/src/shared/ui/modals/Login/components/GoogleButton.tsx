import StoreGoogle from "@app/client/shared/ui/modals/Login/stores/Store-Google";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";
import GoogleIcon from '@mui/icons-material/Google';

function Main() {

	const handleClick = () => {
		StoreGoogle.enterWithGoogle()
	}

	return <Button onClick={handleClick} variant="contained" startIcon={<GoogleIcon />}>
		Войти через Google
	</Button>
}

export default observer(Main);
