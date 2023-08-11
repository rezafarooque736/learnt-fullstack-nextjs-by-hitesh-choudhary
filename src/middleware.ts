import { NextResponse, NextRequest } from "next/server";

/**
 * Middleware function to handle authentication and redirection
 * @param req - The NextRequest object representing the incoming request
 * @returns A NextResponse object representing the response to be sent
 */
export function middleware(req: NextRequest) {
  // Get the path from the request URL
  const path = req.nextUrl.pathname;

  // Check if the path is a public path
  const isPublicPath = path === "/login" || path === "/signup";

  // Get the token from the cookies or set it to an empty string if not present
  const token = req.cookies.get("token")?.value ?? "";

  // If the path is a public path and a token is present, redirect to the home page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the path is not a public path and no token is present, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Limit the middleware to paths starting with(only these paths will be allowed for middleware function written above)
export const config = {
  matcher: ["/about", "/profile/:path*", "/login", "/signup", "/"],
};
