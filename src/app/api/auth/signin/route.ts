import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { verifyPassword } from '@/lib/auth-utils';
import jwt from 'jsonwebtoken';
import { error } from 'console';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await db
    .select()
    .from(users)
    .where(users.email.eq(email))
    .execute();

  if (!user || !(await verifyPassword(password, user[0]?.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  return NextResponse.json({ token });
}
