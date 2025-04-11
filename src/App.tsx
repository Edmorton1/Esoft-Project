import { BrowserRouter, Routes, Route } from "react-router";
import { LazyMain } from "@/components/index.lazy";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/Fallback";
import "@/css/App.scss"
import SocketStore from "@/store/socket-store";
// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense

function App() {
  SocketStore.connection()
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
        <BrowserRouter>
            <Routes>
                <Route index element={<LazyMain />} />
            </Routes>
        </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;