import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';
import { parse } from 'cookie';

export function middleware(req: NextRequest) {
  const cookies = req.headers.get('cookie');
  const token = cookies ? parse(cookies).token : null;

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // return NextResponse.redirect('/signin');
  }

  return NextResponse.next();
}

// Apply the middleware to protected routes only
export const config = {
  matcher: '/api/protected/:path*',
};
