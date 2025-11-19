import db from './db';

export function createUser(email, password) {
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  const user = stmt.run(email, password);
  return user.lastInsertRowid;
}