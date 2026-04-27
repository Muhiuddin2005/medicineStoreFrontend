import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const protectedRoutes = ["/cart", "/checkout", "/orders", "/profile"];
const sellerRoutes = ["/seller"];
const adminRoutes = ["/admin"];

interface JwtPayload {
  id: number;
  email: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => path.startsWith(route)) || 
                      sellerRoutes.some((route) => path.startsWith(route)) || 
                      adminRoutes.some((route) => path.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);


      if (sellerRoutes.some((route) => path.startsWith(route)) && decoded.role !== "SELLER" && decoded.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url)); // Kick non-sellers to home
      }

      // Protect Admin Routes
      if (adminRoutes.some((route) => path.startsWith(route)) && decoded.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url)); // Kick non-admins to home
      }

      // Prevent logged-in users from seeing login/register pages
      if (path === "/login" || path === "/register") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // If token is invalid/expired, delete it and redirect
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

// Optimize middleware so it doesn't run on static files/images
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};