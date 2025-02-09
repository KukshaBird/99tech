import Database from 'better-sqlite3';

export function startDatabase() {
  const db = new Database('./resource.db');

  db.prepare(
    `
   CREATE TABLE IF NOT EXISTS items (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       details TEXT NOT NULL
    )
`,
  ).run();
}
