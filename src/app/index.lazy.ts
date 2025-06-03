import { lazy } from "react";

export const LazyMain = lazy(() => import("@/pages/Main/Main"))
export const LazyLogin = lazy(() => import("@/pages/Login/Login"))
export const LazyRegistration = lazy(() => import("@/pages/Registration/Registration"))
export const LazyUsers = lazy(() => import("@/pages/Users/Users"))
export const LazyMessages = lazy(() => import('@/pages/Messages/Messages'))
export const LazyProfile = lazy(() => import('@/pages/Profile/Profile'))
export const LazySettings = lazy(() => import('@/pages/Settings/Settings'))
export const LazyRoom = lazy(() => import('@/pages/Room/Room'))
export const LazyMap = lazy(() => import('@/pages/Map/Map'))

export const LazyFourHundredFour = lazy(() => import('@/shared/Errors/404'))

export const LazyTest = lazy(() => import('@/pages/test/Test'))
