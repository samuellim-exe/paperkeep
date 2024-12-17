import {
  authMiddleware,
  withAuth,
} from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req) {
  return withAuth(req, { loginPage: "/api/auth/login", isReturnToCurrentPage: false });
}

export const config = {
  matcher: ["/dashboard"],
};
