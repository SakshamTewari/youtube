import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';
import { cookies } from 'next/headers';
import { getUserFromToken } from '@/lib/auth';

// Create TRPC context with authentication
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const token = (await cookies()).get('token')?.value; // Get JWT token from cookies
  const userId = getUserFromToken(token); // Get user ID from JWT token
  return { userId }; // This will be available in all tRPC procedures
});

// Initialize TRPC with SuperJSON transformer
// Note: We are providing context so procedures can have access to userId or other request-related data.
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

// Middleware to attach user to procedures
export const baseProcedure = t.procedure.use(async ({ ctx, next }) => {
  return next({ ctx: { userId: ctx.userId } });
});

//Protected procedure (only for authenticated users)
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new Error('Unauthorized');
  }
  return next();
});
