import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET_KEY || 'missing_key';

// Generate JWT token
export function generateToken(userId: any) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '7d' });
}

//Verify JWT token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { userId: string };
  } catch (error: any) {
    return null;
  }
}

// Get user ID from JWT token
export function getUserFromToken(token?: string) {
  if (!token) return null;
  try {
    const { userId } = jwt.verify(token, SECRET) as { userId: string };
    return userId;
  } catch (error: any) {
    return null;
  }
}
