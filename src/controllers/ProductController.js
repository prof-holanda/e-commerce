const ProductDAO = require('../dao/ProductDAO');
const Product = require('../models/Product');

class ProductController {
    constructor(db) {
        this._dao = new ProductDAO(db);
    }

    async index(req, res) {
        const result = await this._dao.list();

        if (!result) return res.status(404).end();

        res.json(result);
    }

    async show(req, res) {
        const { id } = req.params;

        const result = await this._dao.findById(id);

        if (!result) return res.status(404).end();

        res.json(result);
    }

    async store(req, res) {
        const { name, price, image } = req.body;

        let product = new Product(null, name, price, image);

        product = await this._dao.save(product);

        res.status(201).json(product);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, price, image } = req.body;

        const product = new Product(id, name, price, image);

        await this._dao.update(product);

        res.json(product);
    }

    async destroy(req, res) {
        const { id } = req.params;

        await this._dao.delete(id);

        res.status(204).end();
    }

    async listByIds(req, res) {
        const { ids } = req.body;
 
        const result = await this._dao.listByIds(ids);

        res.json(result);
    }
}

module.exports = ProductController;