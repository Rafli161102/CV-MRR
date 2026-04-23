/**
 * DEPRECATED: SQLite database replaced with MongoDB
 * This file is kept for backward compatibility but returns mock functions
 * All data now stored in MongoDB Atlas
 */

function getDB() {
  console.warn('SQLite is deprecated. Using MongoDB instead.');
  return {
    prepare: () => ({ get: () => null, all: () => [], run: () => ({ lastInsertRowid: 1 }) }),
    exec: () => {},
    pragma: () => {}
  };
}

function closeDB() {
  // No-op for MongoDB
}

module.exports = { getDB, closeDB };
