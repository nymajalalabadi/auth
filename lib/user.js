import db from './db';

export function createUser(email, password) {
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  const user = stmt.run(email, password);
  return user.lastInsertRowid;
}

export function getUserByEmail(email) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
}