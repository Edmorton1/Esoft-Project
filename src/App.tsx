import { BrowserRouter, Routes, Route } from "react-router";
import { LazyForm, LazyLogin, LazyMain, LazyMessages, LazyRegistration } from "@/index.lazy";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/Fallback";
import "@/css/App.scss"
import SocketStore from "@/store/store-socket";
import ErrorAuthorize from "@/ui/ErrorAuthorize";
import { useEffect, useRef, useState } from "react";
import $api from "@/store/api";
import AuthorizeChecking from "@/ui/AuthorizeChecking";
import storeAuthorization from "@/store/store-authorization";
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
            <Routes>
                <Route index element={<LazyMain />} />
                <Route path="/login" element={<LazyLogin />}/>
                <Route path="/registration" element={<LazyRegistration />}/>
                <Route path="/form" element={<LazyForm/>}></Route>
                <Route path="/messages" element={<LazyMessages />}></Route>
            </Routes>
        </BrowserRouter>
    // </ErrorBoundary>
  );
}

export default App;