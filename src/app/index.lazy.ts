import { lazy } from "react";

export const LazyMain = lazy(() => import("@/pages/Main"))
export const LazyLogin = lazy(() => import("@/pages/Login"))
export const LazyRegistration = lazy(() => import("@/pages/Registration"))
export const LazyUsers = lazy(() => import("@/pages/Users"))
export const LazyMessages = lazy(() => import('@/pages/Messages/Messages'))
export const LazyProfile = lazy(() => import('@/pages/Profile'))
export const LazySettings = lazy(() => import('@/pages/Settings'))

export const LazyFourHundredFour = lazy(() => import('@/pages/ErrorPages/404'))

export const LazyTest = lazy(() => import('@/test/Test'))