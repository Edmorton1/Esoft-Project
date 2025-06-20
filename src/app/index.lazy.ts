import { lazy } from "react";

export const LazyMain = lazy(() => import("@/pages/Main/Main"))
export const LazyLogin = lazy(() => import("@/pages/Login/LoginModal"))
export const LazyRegistration = lazy(() => import("@/pages/Registration/Registration"))
export const LazyUsers = lazy(() => import("@/pages/Users/Users"))
export const LazyMessages = lazy(() => import('@/pages/Messages/InsideMessage/Messages'))
export const LazyProfile = lazy(() => import('@/pages/Profile/Profile'))
export const LazySettings = lazy(() => import('@/pages/Settings/Settings'))
export const LazyRoom = lazy(() => import('@/pages/Room/Room'))
export const LazyMap = lazy(() => import('@/pages/Map/Map'))
export const LazyLiked = lazy(() => import("@/pages/Liked/Liked"))
export const LazyMessage = lazy(() => import("@/pages/Messages/outsideMessage/Message"))
export const LazyAdmin = lazy(() => import("@/pages/Admin/Admin"))

export const LazyFourHundredFour = lazy(() => import('@/shared/Errors/404'))

export const LazyTest = lazy(() => import('@/pages/test/Test'))