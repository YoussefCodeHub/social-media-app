import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import ValidationError from "../shared/errors/validation.error";

type ReqTypeKey = keyof Request;
type SchemaType = Partial<Record<ReqTypeKey, ZodType>>;

const validation = (schema: SchemaType) => {
  return (req: Request, res: Response, next: NextFunction): NextFunction => {
    const validationErrors: Array<{
      key: ReqTypeKey;
      issues: Array<{ message: string; path: (string | number | symbol)[] }>;
    }> = [];

    for (const key of Object.keys(schema) as ReqTypeKey[]) {
      if (!schema[key]) continue;

      const validationResults = schema[key]!.safeParse(req[key]);

      if (!validationResults.success) {
        const errors = validationResults.error as ZodError;

        validationErrors.push({
          key,
          issues: errors.issues.map((issue) => ({
            message: issue.message,
            path: issue.path,
          })),
        });
      }
    }

    if (validationErrors.length > 0) {
      throw new ValidationError("Validation Error", {
        errors: validationErrors,
      });
    }

    return next() as unknown as NextFunction;
  };
};

export default validation;
