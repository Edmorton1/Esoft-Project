import {BrowserRouter, Routes, Route} from "react-router";
import { LazyAdmin, LazyFourHundredFour, LazyLiked, LazyLogin, LazyMain, LazyMap, LazyMessage, LazyMessages, LazyPairs, LazyProfile, LazyRegistration, LazyRoom, LazySettings, LazyTest, LazyUsers } from "@app/client/app/index.lazy";
import SocketStore from "@app/client/shared/api/Store-Socket";
import {Suspense, useEffect} from "react";
import Initialization from "@app/client/app/Initialization";
import Header from "@app/client/shared/ui/modules/Header/Header";
import { paths } from "@app/shared/PATHS";
import ChangeTheme from "@app/client/app/theme/ChangeTheme";
import "@app/client/shared/css/App.scss"
import "@app/client/shared/css/modules/LocalRemoteVideo.scss"
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@app/client/errors/Fallback";
import CallLine from "@app/client/pages/Room/widgets/CallLine/CallLine";

// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense

function App() {
	useEffect(() => {
		SocketStore.connection();
	}, []);

	return (
		<ChangeTheme>
		<BrowserRouter>
		<ErrorBoundary key={location.pathname + location.search} FallbackComponent={Fallback}>

				<Initialization />
				<Suspense>
					<Routes>
						<Route element={<Header />}>
							<Route path={paths.login} element={<LazyLogin />} />
							<Route path={paths.registration} element={<LazyRegistration />} />
							<Route path={`${paths.messages}/:toid`} element={<LazyMessages />} />
							<Route path={paths.messages} element={<LazyMessage/>} />
							<Route path={paths.users} element={<LazyUsers />}></Route>
							<Route path={`${paths.profile}/:id`} element={<LazyProfile />} />
							<Route path={paths.settings} element={<LazySettings/>}/>
							<Route path={paths.map} element={<LazyMap />} />
							<Route path={paths.liked} element={<LazyLiked />} />
							<Route path={paths.pairs} element={<LazyPairs />} />
							
							{/* <Route path={paths.room} element={<LazyRoom />} /> */}
							<Route path="*" element={<LazyFourHundredFour />} />

							{/* <Route path={paths.test} element={<LazyTest />} /> */}
						</Route>
						
						<Route path={`${paths.admin}/*`} element={<LazyAdmin />} />
						<Route index element={<LazyMain />} />

					</Routes>
				</Suspense>
				<CallLine />
		</ErrorBoundary>
		</BrowserRouter>
		</ChangeTheme>
	);
}

export default App;
