import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export const dashboard = async ({ request }) => withAuth(request);
