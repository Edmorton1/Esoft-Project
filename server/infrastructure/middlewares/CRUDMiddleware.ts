import { tables } from "@t/gen/types";
import { Request, Response, NextFunction } from "express";

class CRUDMiddleware {
  constructor(
    readonly table: tables
  ) {}

  CRUDshort = (req: Request, res: Response, next: NextFunction) => {
    console.log(this.table)
    if (this.table === 'forms' || this.table === 'user_tags') {
      res.set('Cache-Control', `public, max-age=${60 * 5}, must-revalidate`);
    }
    next()
  }
}

export default CRUDMiddleware