import { NextApiRequest, NextApiResponse } from 'next';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { db } from '@/lib/db'; // Import your database connection
import { users } from '@/db/schema'; // Import your schema

// Create Drizzle database instance
const sql = postgres(process.env.DATABASE_URL!);
const dbClient = drizzle(sql);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const clerkEvent = req.body;

  try {
    if (clerkEvent.type === 'user.created') {
      await dbClient.insert(users).values({
        id: clerkEvent.data.id,
        email: clerkEvent.data.email_addresses[0].email_address,
        name: clerkEvent.data.first_name + ' ' + clerkEvent.data.last_name,
        createdAt: new Date(),
      });
    }

    if (clerkEvent.type === 'user.updated') {
      await dbClient
        .update(users)
        .set({
          email: clerkEvent.data.email_addresses[0].email_address,
          name: clerkEvent.data.first_name + ' ' + clerkEvent.data.last_name,
        })
        .where(users.id.equals(clerkEvent.data.id));
    }

    if (clerkEvent.type === 'user.deleted') {
      await dbClient.delete(users).where(users.id.equals(clerkEvent.data.id));
    }

    return res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
