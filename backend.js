const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../db/database.sqlite'));

// Inicializar banco se não existir
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    preco REAL,
    estoque INTEGER
  )`);
});

module.exports = {
  getAllProducts() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM produtos', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  addProduct({ nome, preco, estoque }) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)`,
        [nome, preco, estoque],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        });
    });
  },

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM produtos WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve({ deleted: this.changes });
      });
    });
  }
};
