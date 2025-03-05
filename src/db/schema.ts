import { uniqueIndex, varchar } from 'drizzle-orm/mysql-core';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').unique().notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: text('password').notNull(),
    name: text('name').notNull(),
    // TODO: add banner fields
    imageUrl: text('image_url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  //(t) => [uniqueIndex('clerk_id_idx').on(t.clerkId)],
);
