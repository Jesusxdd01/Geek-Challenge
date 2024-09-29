const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Obtener todos los productos
router.get('/', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ products: rows });
  });
});

// Crear un nuevo producto
router.post('/', upload.single('image'), (req, res) => {
  const { title, price } = req.body;
  const image = req.file ? req.file.path : '';

  if (!title || !price || !image) {
    return res.status(400).json({ error: 'Por favor proporciona todos los campos requeridos' });
  }

  const sql = 'INSERT INTO products (title, price, image) VALUES (?, ?, ?)';
  const params = [title, price, image];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      title,
      price,
      image
    });
  });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

module.exports = router;
