
function ShoopingCartStorage(storageManager) {
    this.storage = storageManager;
}

ShoopingCartStorage.prototype.add = function (productId) {
    const cart = this.storage.get('cart');

    if (this.exists(productId)) {
        return;
    }

    cart.push(productId);
    this.storage.set('cart', cart);
}

ShoopingCartStorage.prototype.remove = function (productId) {
    const cart = this.storage.get('cart');

    if (!this.exists(productId)) {
        return;
    }

    const producExisting = cart.findIndex(product => product.id === productId);

    cart.splice(producExisting, 1);
    this.storage.set('cart', cart);
}

ShoopingCartStorage.prototype.exists = function (productId) {
    const cart = this.storage.get('cart');
    const producExisting = cart.findIndex(product => product.id === productId);

    return producExisting !== -1;
}

ShoopingCartStorage.prototype.getAll = function () {
    return this.storage.get('cart');
}
