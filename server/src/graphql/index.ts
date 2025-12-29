import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./schema";

export const graphqlHandler = createHandler({
  schema,
  context: (req) => ({ req: req.raw }),
});
