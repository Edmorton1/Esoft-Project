// import $api from "@app/client/shared/api/api";
// import { serverPaths } from "@app/shared/PATHS";
import TimeoutButton from "@app/client/Test/TimeoutButton";

function Test() {

	return <TimeoutButton timeout={1000} onClick={() => console.log("asdasdasd")} variant="outlined">asddsaasdasd</TimeoutButton>
}

export default Test;
