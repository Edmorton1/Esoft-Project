import {BrowserRouter, Routes, Route} from "react-router";
import { LazyFourHundredFour, LazyLogin, LazyMain, LazyMessages, LazyProfile, LazyRegistration, LazySettings, LazyTest, LazyUsers } from "@/index.lazy";
import SocketStore from "@/store/Store-Socket";
import {Suspense, useEffect} from "react";
import Initialization from "@/ui/Initialization";
import Layout from "@/Layout";
import { ErrorBoundary } from "react-error-boundary";
import { paths } from "@shared/PATHS";
// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense

function App() {
	useEffect(() => {
		SocketStore.connection();
	}, []);

	return (
		// <ErrorBoundary key={location.pathname + location.search} FallbackComponent={Fallback}>
		<BrowserRouter>
			<Initialization />
			<Suspense>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<LazyMain />} />
						<Route path={paths.login} element={<LazyLogin />} />
						<Route path={paths.registration} element={<LazyRegistration />} />
						<Route path={paths.messages} element={<LazyMessages />} />
						<Route path={paths.users} element={<LazyUsers />}></Route>
						<Route path={`${paths.profile}/:id`} element={<LazyProfile />} />
            <Route path={paths.settings} element={<LazySettings/>}/>
						<Route path="*" element={<LazyFourHundredFour />} />

						<Route path={paths.test} element={<LazyTest />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
		// </ErrorBoundary>
	);
}

export default App;
