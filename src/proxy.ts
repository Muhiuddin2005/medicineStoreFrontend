import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  let userRole: string | null = null;
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      userRole = decoded?.role;
    } catch {
      userRole = null;
    }
  }

  const isAdminPath = pathname.startsWith('/admin');
  const isSellerPath = pathname.startsWith('/seller');
  const isDashboard = pathname.startsWith('/dashboard');

  if (isAdminPath && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/forbidden', request.url));
  }

  if (isSellerPath && (userRole !== 'SELLER' && userRole !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/forbidden', request.url));
  }

  if ((isAdminPath || isSellerPath || isDashboard) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|forbidden|login|register).*)'],
};
