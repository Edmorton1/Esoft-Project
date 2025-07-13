import StoreGoogle from "@app/client/shared/ui/modals/Login/stores/Store-Google";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";
import GoogleIcon from '@mui/icons-material/Google';

function GoogleButton() {

	const handleClick = () => {
		StoreGoogle.enterWithGoogle()
	}

	return <Button onClick={handleClick} variant="outlined" color="plombir" startIcon={<GoogleIcon />} fullWidth>
		Войти через Google
	</Button>
}

export default observer(GoogleButton);
