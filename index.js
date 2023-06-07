const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const ProductController = require('./src/controllers/ProductController');

const app = express();
const db = new sqlite3.Database('./database.sqlite');
/*
db.serialize(() => {
    db.run(`
    CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name VARCHAR(200) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image VARCHAR(255) NOT NULL
    );
    `);
});
*/
const productController = new ProductController(db);

app.use(cors({origin: '*'}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/v1/products', (req, res) => {    
    productController.index(req, res);
});

app.get('/api/v1/products/:id', (req, res) => {
    productController.show(req, res);
});

app.post('/api/v1/products', (req, res) => {
    productController.store(req, res);
});

app.put('/api/v1/products/:id', (req, res) => {
    productController.update(req, res);
});

app.delete('/api/v1/products/:id', (req, res) => {
    productController.destroy(req, res);
});

app.post('/api/v1/products/list-by-ids', (req, res) => {
    productController.listByIds(req, res);
});

app.listen(3000, () => {
    console.log('Server is running at port 3000!');
});