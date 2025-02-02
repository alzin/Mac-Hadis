import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
    const headers = {
        'WWW-authenticate': 'Basic realm="Secure Area"',
    };
    return NextResponse.json({ message: "Authentication required" }, { status: 401, headers })
}
