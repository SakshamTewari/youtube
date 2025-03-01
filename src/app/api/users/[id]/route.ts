import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET a single user by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, params.id))
      .limit(1);

    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('Error fetching user', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE user by id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { name, email } = await req.json();

    const updatedUser = await db
      .update(users)
      .set({ name, email })
      .where(eq(users.id, params.id));

    if (!updatedUser)
      return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ message: 'User updated', user: updatedUser });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
