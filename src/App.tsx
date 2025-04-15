import { BrowserRouter, Routes, Route } from "react-router";
import { LazyForm, LazyLogin, LazyMain, LazyRegistration } from "@/components/index.lazy";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/Fallback";
import "@/css/App.scss"
import SocketStore from "@/store/store-socket";
import ErrorAuthorize from "@/ui/ErrorAuthorize";
import { useEffect, useRef, useState } from "react";
import $api from "@/store/api";
import AuthorizeChecking from "@/ui/AuthorizeChecking";
import storeAuthorization from "@/store/store-authorization";
// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense

function App() {
  SocketStore.connection()

  return (
    // <ErrorBoundary FallbackComponent={Fallback}>
        <BrowserRouter>
          <AuthorizeChecking/>
            <Routes>
                <Route index element={<LazyMain />} />
                <Route path="/login" element={<LazyLogin />}/>
                <Route path="/registration" element={<LazyRegistration />}/>
                <Route path="/form" element={<LazyForm/>}></Route>
            </Routes>
        </BrowserRouter>
    // </ErrorBoundary>
  );
}

export default App;