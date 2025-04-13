import { lazy } from "react";

export const LazyMain = lazy(() => import("@/components/Main"))
export const LazyLogin = lazy(() => import("@/components/Login"))
export const LazyRegistration = lazy(() => import("@/components/Registration"))