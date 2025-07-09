import { lazy } from "react";

export const LazyMain = lazy(() => import("@app/client/pages/Main/Main"))
export const LazyLogin = lazy(() => import("@app/client/shared/ui/modals/Login/LoginModal"))
export const LazyRegistration = lazy(() => import("@app/client/pages/Registration/Registration"))
export const LazyUsers = lazy(() => import("@app/client/pages/Users/Users"))
export const LazyMessages = lazy(() => import('@app/client/pages/Messages/InsideMessage/Messages'))
export const LazyProfile = lazy(() => import('@app/client/pages/Profile/Profile'))
export const LazySettings = lazy(() => import('@app/client/pages/Settings/Settings'))
export const LazyMap = lazy(() => import('@app/client/pages/Map/Map'))
export const LazyLiked = lazy(() => import("@app/client/pages/Liked/Liked"))
export const LazyMessage = lazy(() => import("@app/client/pages/Messages/outsideMessage/Message"))
export const LazyAdmin = lazy(() => import("@app/client/pages/Admin/Admin"))
export const LazyPairs = lazy(() => import("@app/client/pages/Pairs/Pairs"))

export const LazyFourHundredFour = lazy(() => import('@app/client/shared/Errors/404'))