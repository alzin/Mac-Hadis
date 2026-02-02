import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the raw Host header (Reliable on Cloud Run)
  // This handles cases where internal container hostname is "localhost"
  const hostHeader = request.headers.get('host') || '';
  const [hostname] = hostHeader.split(':'); // Remove port (e.g. :3000) if present

  const url = request.nextUrl.clone();
  
  // --- CONFIGURATION ---
  // FALSE = Redirect "www" -> "mac-hadis.com" (Your Goal)
  const forceWWW = false; 

  // --- LOGIC ---
  
  // Case 1: Force non-www (Redirect www -> non-www)
  if (!forceWWW && hostname.startsWith('www.')) {
    url.hostname = hostname.replace('www.', '');
    url.port = ''; // Ensure no port is passed
    return NextResponse.redirect(url, 301);
  }

  // Case 2: Force www (Redirect non-www -> www)
  if (forceWWW && !hostname.startsWith('www.')) {
    url.hostname = `www.${hostname}`;
    url.port = ''; // Ensure no port is passed
    return NextResponse.redirect(url, 301);
  }

  // Case 3: Force HTTPS (Cloud Run terminates SSL, so we check x-forwarded-proto)
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto');
    if (proto === 'http') {
      url.protocol = 'https:';
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};