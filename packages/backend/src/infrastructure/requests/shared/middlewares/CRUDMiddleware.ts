// import logger from "@app/server/helpers/logger";
// import HttpContext from "@app/server/infrastructure/express/Http.context";
// import { tables } from "@app/types/gen/types";

// class CRUDMiddleware {
//   constructor(
//     readonly table: tables
//   ) {}

//   CRUDshort = (ctx: HttpContext) => {
//     logger.info(this.table)
//     if (this.table === 'forms' || this.table === 'user_tags') {
//       ctx.set('Cache-Control', `public, max-age=${60 * 5}, must-revalidate`);
//     }
//     ctx.next()
//   }
// }

// export default CRUDMiddleware