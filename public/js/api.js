
function Api() {
    this.url = 'http://localhost:3000/api/v1/'
}

Api.prototype.getProducts = function() {
    return fetch(this.url + 'products')
        .then(res => res.json())
}

Api.prototype.getProduct = function(id) {
    return fetch(this.url + 'products/' + id)
        .then(res => res.json())
}

Api.prototype.saveProduct = function(product) {
    return fetch(this.url + 'products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(res => res.json())
}

Api.prototype.updateProduct = function(product) {
    return fetch(this.url + 'products/' + product.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(res => res.json())
}

Api.prototype.deleteProduct = function(id) {
    return fetch(this.url + 'products/' + id, {
        method: 'DELETE'
    })
}

Api.prototype.getProductsByIds = function(ids) {
    return fetch(this.url + 'products/list-by-ids', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ids: ids})
    })
    .then(res => res.json())
}

const api = new Api();
