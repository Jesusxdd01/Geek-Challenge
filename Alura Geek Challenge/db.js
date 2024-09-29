const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');  // O usa un archivo, por ejemplo, 'database.db'

db.serialize(() => {
  db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, title TEXT, price REAL, image TEXT)");
});

module.exports = db;
