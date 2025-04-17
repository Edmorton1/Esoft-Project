import { BrowserRouter, Routes, Route } from "react-router";
import { LazyLogin, LazyMain, LazyMessages, LazyRegistration } from "@/index.lazy";
import "@/css/App.scss"
import SocketStore from "@/store/Store-Socket";
import { Suspense, useEffect } from "react";
import AuthorizeChecking from "@/ui/AuthorizeChecking";
import Layout from "@/Layout";
// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense

function App() {
  useEffect(() => {
    SocketStore.connection()
  }, [])


  return (
    // <ErrorBoundary FallbackComponent={Fallback}>
        <BrowserRouter>
        <Layout />
          <AuthorizeChecking/>
          <Suspense>
            <Routes>
                  <Route index element={<LazyMain />} />
                  <Route path="/login" element={<LazyLogin />}/>
                  <Route path="/registration" element={<LazyRegistration />}/>
                  {/* <Route path="/form" element={<LazyForm/>}></Route> */}
                  <Route path="/messages" element={<LazyMessages />}></Route>
                  <Route path="*" element={<div>Такой страницы нет</div>}></Route>
              </Routes>
          </Suspense>
        </BrowserRouter>
    // </ErrorBoundary>
  );
}

export default App;