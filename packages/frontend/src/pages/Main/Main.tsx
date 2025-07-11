// import { PREFIX } from "@app/shared/CONST";
// import { serverPaths } from "@app/shared/PATHS";
// import { URL_SERVER } from "@app/shared/URLS";

import StoreGoogle from "@app/client/pages/Main/store/Store-Google";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function Main() {
	console.log("GOOGLE ID", _GOOGLE_CLIENT_ID)

	// const onSuccess = (data: CredentialResponse) => {
	// 	console.log(data)
	// 	if (data.credential) sessionStorage.setItem("credential", data.credential)
	// }
	// const onFailure = () => console.error("GOOGLE ERROR")

	// 	clientId: 
	// "758847377923-115mpg3huhktaufauksig02dof6iur7k.apps.googleusercontent.com"

	// credential: 
	// "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxMDMzODYwNzE2ZTNhMmFhYjM4MGYwMGRiZTM5YTcxMTQ4NDZiYTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NTg4NDczNzc5MjMtMTE1bXBnM2h1aGt0YXVmYXVrc2lnMDJkb2Y2aXVyN2suYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NTg4NDczNzc5MjMtMTE1bXBnM2h1aGt0YXVmYXVrc2lnMDJkb2Y2aXVyN2suYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUxMzc3Mjg3OTA2MjgxODEwNTMiLCJlbWFpbCI6InNpdGV6bmFrb21zdHZhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3NTIyMTE2NzIsIm5hbWUiOiJKb2UgUGVhY2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSWpUYmo1YVZkclItMkR6cElid0RUUE1ZbGpXZTJ3eFNuTzlEa3U2T2VwSkh3RUhnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkpvZSIsImZhbWlseV9uYW1lIjoiUGVhY2giLCJpYXQiOjE3NTIyMTE5NzIsImV4cCI6MTc1MjIxNTU3MiwianRpIjoiNjYyZDVkNWEzZTAyYjA3MmVjYjFkYmE4MDU0Mzk2YjE2MGU3MTIxYiJ9.fn8VtvzRl-DaiRHO3UVAeiIn9Z2Fh_bKisqNGiWNYXTBjvm3BHsqkc2D7qw_tuGZXPKpF538nm-5xV18rPYJW8HeFYYNo_yjycP_R2W165hLwLQOWKTUzDgttGz85rRGVVM_gWwV6nn_e4qiSKl5cBaOTDm5mFAe-kDWBUKpkep3xPBw4SFQ2kPuWA3OT0DgtPLcDkh0LCx-lZLfi7hMyFO0mrqqpIVu7i9j0kI_kV1x_oLupzTPTrnlKC2tSIkH_JN9y-QbNBOi2X_48FcJAPc6f6g6mE8fGZX1gU-1NO0n0YxdmAi0nIqub13-Eyh2C9vVltNXy1N78u32evE1bg"

	// select_by: 
	// "btn_confirm"

	// const googleAuth = {
	// 	url: "https://accounts.google.com/o/oauth2/v2/auth",
	// 	params: {
	// 		client_id: _GOOGLE_CLIENT_ID,
	// 		redirect_uri: URL_SERVER + PREFIX + serverPaths.googleGetToken,
	// 		response_type: "code",
	// 		scope: "email",
	// 		// state: crypto.randomUUID()
	// 	}
	// }
	// <a href={`${googleAuth.url}?${new URLSearchParams(googleAuth.params).toString()}`}>Гугл</a>

	useEffect(() => {
		StoreGoogle.getAuthUrl()
	}, [])

	return (
		// <button onClick={() => StoreError.FourtyFour()}>asdasd</button>
		<main>
			{StoreGoogle.url && <a href={StoreGoogle.url}>Гугл</a>}
			asdsaasd
		</main>
	);
}

export default observer(Main);
