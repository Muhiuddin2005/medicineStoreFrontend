import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isDashboard = pathname.startsWith('/dashboard');
  const isSellerRoute = pathname.startsWith('/seller');
  const isAdminRoute = pathname.startsWith('/admin');
  const isCheckout = pathname.startsWith('/checkout');
  let userRole = null;
  if (token) {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      userRole = JSON.parse(decoded).role;
    } catch {
      userRole = null;
    }
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if ((isCheckout || isDashboard) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isSellerRoute) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    
    if (userRole !== 'SELLER' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url)); 
    }
  }

  if (isAdminRoute) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};