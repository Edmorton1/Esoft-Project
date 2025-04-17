import { lazy } from "react";

export const LazyMain = lazy(() => import("@/pages/Main"))
export const LazyLogin = lazy(() => import("@/pages/Login"))
export const LazyRegistration = lazy(() => import("@/pages/Registration"))
export const LazyForm = lazy(() => import('@/pages/Form'))
export const LazyMessages = lazy(() => import('@/pages/Messages'))