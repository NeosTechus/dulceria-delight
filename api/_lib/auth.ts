import jwt from 'jsonwebtoken';
import type { IncomingMessage } from 'http';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JwtPayload {
    userId: string;
    email: string;
    role: 'customer' | 'admin' | 'chef';
}

export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function extractToken(req: IncomingMessage): string | null {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return null;
    return auth.slice(7);
}

export function authenticate(req: IncomingMessage): JwtPayload | null {
    const token = extractToken(req);
    if (!token) return null;
    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}
