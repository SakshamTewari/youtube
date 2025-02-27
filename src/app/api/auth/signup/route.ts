import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { hashPassword } from '@/lib/auth-utils';
import { error } from 'console';
import { hash } from 'crypto';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and Password are required' },
      { status: 400 },
    );
  }

  const hashedPassword = await hashPassword(password);

  try {
    await db.insert(users).values({ email, password: hashedPassword });
    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'User already exists!' },
      { status: 400 },
    );
  }
}
