import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.rewrite(new URL("/admin", req.url));
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const role = token?.role;
        if (req.url.includes("admin") && role === "admin") return true;

        // if (req.url.includes("comment") && role === "user") return true;
        // return token?.role === 'admin'

        return false;
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
