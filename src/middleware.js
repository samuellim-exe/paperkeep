import { createMiddleware } from "@rescale/nemo";
import { dashboard } from "./middlewares/dashboard";
import { transactionsApiMiddleware } from "./middlewares/api/transactions";

const middlewares = {
  "/dashboard{/:slug}": [dashboard],
  "/api/transactions{/:slug}": [transactionsApiMiddleware]
};

export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ["/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};