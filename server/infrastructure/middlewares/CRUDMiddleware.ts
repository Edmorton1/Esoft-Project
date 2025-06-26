// import logger from "@s/helpers/logger";
// import HttpContext from "@s/infrastructure/express/Http.context";
// import { tables } from "@t/gen/types";

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