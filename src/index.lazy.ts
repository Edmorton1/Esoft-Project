import { lazy } from "react";

export const LazyMain = lazy(() => import("@/pages/Main"))
export const LazyLogin = lazy(() => import("@/pages/Login"))
export const LazyRegistration = lazy(() => import("@/pages/Registration"))
// export const LazyForm = lazy(() => import('@/modules/Form'))
export const LazyUsers = lazy(() => import("@/pages/Users"))
export const LazyMessages = lazy(() => import('@/pages/Messages'))