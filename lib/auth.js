import { lucia } from 'lucia';
import { betterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { cookies } from 'next/headers';
import db from './db';

const adapter = betterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

export async function createAuthSession(userId) {

    const session = lucia.createSession(userId, {});

    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
}