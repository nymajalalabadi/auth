import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { cookies } from 'next/headers';
import db from './db';

const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

const auth = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

export async function createAuthSession(userId) {

    const session = lucia.createSession(userId, {});

    const sessionCookie = auth.createSessionCookie(session.id);

    (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
}



export async function verifyAuth() {
  const sessionCookie = (await cookies()).get(auth.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {

    const sessionCookie = auth.createSessionCookie(result.session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  if(!result.session) {
    const sessionCookie = auth.createBlankSessionCookie(null);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  } catch {
    return {
      user: null,
      session: null,
    };
  }

  return result;

}

export async function destorySession() {
  const { session } = await verifyAuth();

  if(!session) {
    return{
      error: 'No session found'
    }
  }

  await auth.invalidateSession(session.id);

  const sessionCookie = auth.createBlankSessionCookie(null);

  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}