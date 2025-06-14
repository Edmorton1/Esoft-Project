import {BrowserRouter, Routes, Route} from "react-router";
import { LazyFourHundredFour, LazyLiked, LazyLogin, LazyMain, LazyMap, LazyMessage, LazyMessages, LazyProfile, LazyRegistration, LazyRoom, LazySettings, LazyTest, LazyUsers } from "@/app/index.lazy";
import SocketStore from "@/shared/api/Store-Socket";
import {Suspense, useEffect} from "react";
import Initialization from "@/app/Initialization";
import Header from "@/shared/components/Header";
import { paths } from "@shared/PATHS";
import ChangeTheme from "@/app/theme/ChangeTheme";
import "@/shared/css/App.scss"
import "@/shared/css/modules/LocalRemoteVideo.scss"

// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense

function App() {
	useEffect(() => {
		SocketStore.connection();
	}, []);

	return (
		// <ErrorBoundary key={location.pathname + location.search} FallbackComponent={Fallback}>
		<BrowserRouter>
			<ChangeTheme>
				<Initialization />
				<Suspense>
					<Routes>
						<Route element={<Header />}>
							<Route index element={<LazyMain />} />
							<Route path={paths.login} element={<LazyLogin />} />
							<Route path={paths.registration} element={<LazyRegistration />} />
							<Route path={`${paths.messages}/:toid`} element={<LazyMessages />} />
							<Route path={paths.messages} element={<LazyMessage/>} />
							<Route path={paths.users} element={<LazyUsers />}></Route>
							<Route path={`${paths.profile}/:id`} element={<LazyProfile />} />
							<Route path={paths.settings} element={<LazySettings/>}/>
							<Route path={paths.map} element={<LazyMap />} />
							<Route path={paths.liked} element={<LazyLiked />} />
							
							<Route path={paths.room} element={<LazyRoom />} />
							<Route path="*" element={<LazyFourHundredFour />} />

							<Route path={paths.test} element={<LazyTest />} />
						</Route>
					</Routes>
				</Suspense>
			</ChangeTheme>
		</BrowserRouter>
		// </ErrorBoundary>
	);
}

export default App;
