import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodType<any, any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues });
    }

    req.body = result.data;
    next();
  };
