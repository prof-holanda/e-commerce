const Product = require('../models/Product');

class ProductDAO {
    constructor(db) {
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM products', (error, result) => {
                if (error) return reject('Error on list products');

                return resolve(result.map(product => new Product(
                    product.id, 
                    product.name, 
                    product.price, 
                    product.image
                )));
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this._db.get('SELECT * FROM products WHERE id = ?', [id], (error, result) => {
                if (error) return reject('Error on find product');
                
                if (!result) return resolve(null);
                
                return resolve(new Product(
                    result.id, 
                    result.name, 
                    result.price, 
                    result.image
                ));
            });
        });
    }

    save(product) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO products (name, price, image)
                VALUES (?, ?, ?)
            `, [
                product.name,
                product.price,
                product.image
            ], (error) => {
                if (error) return reject('Error on save product');

                this._db.get('SELECT last_insert_rowid() as id', (error, result) => {
                    if (error) return reject('Error on find product');
                    
                    product.id = result.id;

                    return resolve(product);
                });
            });
        });
    }

    update(product) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?
            `, [
                product.name,
                product.price,
                product.image,
                product.id
            ], (error) => {
                if (error) return reject('Error on update product');

                return resolve();
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                DELETE FROM products WHERE id = ?
            `, [id], (error) => {
                if (error) return reject('Error on delete product');

                return resolve();
            });
        });
    }

    listByIds(ids) {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT * FROM products WHERE id IN (${ids.join(',')})`, (error, result) => {
                if (error) return reject('Error on list products');
                return resolve(result.map(product => new Product(
                    product.id, 
                    product.name, 
                    product.price, 
                    product.image
                )));
            });
        });
    }
}

module.exports = ProductDAO;