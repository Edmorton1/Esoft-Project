// import { universalController } from "@app/server/OLD/controllers";
// import AuthMiddleware from "@app/server/infrastructure/middlewares/AuthMiddleware";
// import { tablesArr } from "@app/server/config/containers/container.di";
// import {Router} from "express";

// type HTTPMethod = 'get' | 'post' | 'put' | 'delete'
// interface routeInterface {
//   method: HTTPMethod
//   path: string
//   handler: () => any
//   auth?: boolean
// }

// const adminRouter = Router();

// // CRUD ЗАПРОСЫ
// const publicEndpoints = [
//   "/forms",
//   "/forms/:id",
//   "/likes"
// ]

// tablesArr.forEach(table => {
//   const routes: routeInterface[] = [
//     { method: "get", path: `/${table}`, handler: universalController("get", table) },
//     { method: "get", path: `/${table}/:id`, handler: universalController("getById", table) },
//     { method: "post", path: `/${table}`, handler: universalController("post", table) },
//     { method: "put", path: `/${table}/:id`, handler: universalController("put", table) },
//     { method: "delete", path: `/${table}/:id`, handler: universalController("delete", table), auth: true }
//   ]

//   routes.forEach(route => {
//     const middlewares = []
//     if (!publicEndpoints.includes(route.path)) middlewares.push(AuthMiddleware.OnlyAdmin)
    
//     adminRouter[route.method](route.path, ...middlewares, route.handler)
//   })
// })

// export default adminRouter;

// // tablesArr.forEach(table => {
//   // publicRouter.get(`/${table}`, asyncHandle(universalController('get', table)))
//   // publicRouter.get(`/${table}/:id`, asyncHandle(universalController('getById', table)))
//   // publicRouter.post(`/${table}`, asyncHandle(universalController('post', table)))
//   // publicRouter.put(`/${table}/:id`, asyncHandle(universalController('put', table)))
//   // publicRouter.delete(`/${table}/:id`, AuthMiddleware.OnlyAuth, asyncHandle(universalController('delete', table)))
// // })
// // publicRouter.get(`/forms`, asyncHandle(universalController('get', 'forms')))
// // publicRouter.get(`/forms/:id`, asyncHandle(universalController('getById', 'forms')))
// // publicRouter.get(`/likes`, asyncHandle(universalController('get', 'likes')))