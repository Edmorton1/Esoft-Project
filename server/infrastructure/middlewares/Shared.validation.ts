import { Request } from "express";
import { z } from "zod";

class SharedValidation {
  OnlyId = (req: Request): [number] => {
    const id = z.coerce.number().parse(req.params.id);

    return [id]
  }
};

export default new SharedValidation