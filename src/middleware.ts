import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Use nextUrl properties to safely separate domain from port
  const url = request.nextUrl.clone();
  const hostname = url.hostname; // This is just the domain (e.g. "www.mac-hadis.com")

  // --- CONFIGURATION ---
  // Set to TRUE to force "www.mac-hadis.com"
  // Set to FALSE to force "mac-hadis.com" (Matches your current image config)
  const forceWWW = false; 

  // Case 1: Force non-www (Redirect www -> non-www)
  if (!forceWWW && hostname.startsWith('www.')) {
    url.hostname = hostname.replace('www.', '');
    // IMPORTANT: Pass 301 for SEO "Permanent Redirect"
    return NextResponse.redirect(url, 301);
  }

  // Case 2: Force www (Redirect non-www -> www)
  if (forceWWW && !hostname.startsWith('www.')) {
    url.hostname = `www.${hostname}`;
    // IMPORTANT: Pass 301 for SEO "Permanent Redirect"
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Keep your matcher config, it is good
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};