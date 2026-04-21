const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'cms.db');

let db = null;

function getDB() {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    initializeDatabase();
  }
  return db;
}

function initializeDatabase() {
  // Create tables if they don't exist
  const tables = `
    -- Admin Users Table
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Projects (Portfolio)
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT,
      category TEXT,
      description TEXT,
      image TEXT,
      images TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Work Experience
    CREATE TABLE IF NOT EXISTS work_experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      description TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Education
    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year TEXT NOT NULL,
      degree TEXT NOT NULL,
      institution TEXT NOT NULL,
      description TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Photo Gallery
    CREATE TABLE IF NOT EXISTS photo_gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      title TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Page Content (Hero, About, etc)
    CREATE TABLE IF NOT EXISTS page_content (
      id TEXT PRIMARY KEY,
      section_name TEXT NOT NULL,
      content JSON,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Settings
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Split and execute each statement
  const statements = tables.split(';').filter(s => s.trim());
  statements.forEach(statement => {
    if (statement.trim()) {
      db.exec(statement + ';');
    }
  });
}

function closeDB() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = { getDB, closeDB };
