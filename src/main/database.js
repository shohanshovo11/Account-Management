import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'path'

let db

export function initializeDatabase(isDev) {
  const dbPath = isDev
    ? join(app.getPath('userData'), 'app-database.db')
    : join(process.cwd(), 'app-database.db')

  db = new Database(dbPath, {
    verbose: console.log
  })

  console.log('Database file path:', dbPath)

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );
  `)
}

export function getUsers() {
  const stmt = db.prepare('SELECT * FROM users')
  return stmt.all()
}

export function addUser(name, email) {
  try {
    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
    stmt.run(name, email)
    return { success: true }
  } catch (err) {
    console.error('Error adding user:', err.message)
    return { success: false, error: err.message }
  }
}
