import { BrowserRouter, Routes, Route } from "react-router";
import { LazyLogin, LazyMain, LazyRegistration } from "@/components/index.lazy";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/Fallback";
import "@/css/App.scss"
import SocketStore from "@/store/store-socket";
// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense

function App() {
  SocketStore.connection()
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
        <BrowserRouter>
            <Routes>
                <Route index element={<LazyMain />} />
                <Route path="/login" element={<LazyLogin />}/>
                <Route path="/registration" element={<LazyRegistration />}/>
            </Routes>
        </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;