import {BrowserRouter, Routes, Route} from "react-router";
import { LazyFourHundredFour, LazyLogin, LazyMain, LazyMessages, LazyProfile, LazyRegistration, LazySettings, LazyTest, LazyUsers } from "@/index.lazy";
import "@/css/App.scss";
import SocketStore from "@/store/Store-Socket";
import {Suspense, useEffect} from "react";
import Initialization from "@/ui/Initialization";
import Layout from "@/Layout";
import {ErrorBoundary} from "react-error-boundary";
import Fallback from "@/Fallback";
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
						<Route path="/login" element={<LazyLogin />} />
						<Route path="/registration" element={<LazyRegistration />} />
						<Route path="/messages" element={<LazyMessages />} />
						<Route path="/users" element={<LazyUsers />}></Route>
						<Route path="/profile/:id" element={<LazyProfile />} />
            <Route path="/settings" element={<LazySettings/>}/>
						<Route path="*" element={<LazyFourHundredFour />} />

						<Route path="/test" element={<LazyTest />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
		// </ErrorBoundary>
	);
}

export default App;
