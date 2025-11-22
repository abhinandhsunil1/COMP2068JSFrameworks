const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Temporary in-memory data
let products = [
  { id: 1, name: 'Apple', price: 2 },
  { id: 2, name: 'Milk', price: 4 }
];

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET one product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  res.json(product || {});
});

// POST create product
app.post('/api/products', (req, res) => {
  const newId = products.length
    ? Math.max(...products.map(p => p.id)) + 1
    : 1;

  const newProduct = { id: newId, ...req.body };
  products.push(newProduct);

  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const id = +req.params.id;
  products = products.map(p =>
    p.id === id ? { ...p, ...req.body } : p
  );

  res.json(products.find(p => p.id === id));
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== +req.params.id);
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));