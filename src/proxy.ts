import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getBlogByOldTitle, getBlogByTitle } from '@/services/blogs';

// Blog posts render on demand inside the root loading.tsx Suspense boundary, so
// notFound() / permanentRedirect() in the page arrive after a 200 status has
// been sent (a soft 404, or a meta refresh instead of a 308). Resolve the slug
// here, before rendering, so crawlers get a real status code.
async function resolveBlogPath(request: NextRequest) {
    const match = request.nextUrl.pathname.match(/^\/blogs\/([^/]+)$/);
    if (!match) return undefined;

    let title: string;
    try {
        title = decodeURIComponent(match[1]);
    } catch {
        return undefined; // Malformed encoding: leave it to the page.
    }

    if (await getBlogByTitle(title)) return undefined;

    const url = request.nextUrl.clone();
    const renamed = await getBlogByOldTitle(title);
    if (renamed) {
        url.pathname = `/blogs/${encodeURIComponent(renamed.title)}`;
        return NextResponse.redirect(url, 308);
    }

    // No route matches this path, so the not-found page renders with a 404.
    url.pathname = '/_not-found';
    return NextResponse.rewrite(url);
}

export async function proxy(request: NextRequest) {
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

    const blogResponse = await resolveBlogPath(request);
    if (blogResponse) return blogResponse;

    return NextResponse.next();
}

export const config = {
    // Match all paths
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    ],
};