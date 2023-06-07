
const shoopingCartStorage = new ShoopingCartStorage(new LocalStorageManager());

async function loadProducts() {
    const products = await api.getProducts();

    $('#products').html(products.map(product => {
        const addedToCart = shoopingCartStorage.exists(product.id);

        return ProductCard({ product, addedToCart });
    }));
}

function loadHeader() {
    $('#header').html(Header());
}

function loadFooter() {
    $('#footer').html(Footer());
}

function blockButtonBuy(button) {
    $(button).html('Added to cart');
    $(button).attr('disabled', true);
    $(button).addClass('text-slate-400');
    $(button).addClass('bg-slate-50');
}

async function addToCart(id, button) {
    blockButtonBuy(button);

    const product = await api.getProduct(id);

    shoopingCartStorage.add(product);
}

function showCart() {
    const products = shoopingCartStorage.getAll();

    $('#cart').html(products.map(product => CartItem(product)));

    updateTotalPrice();
}

function updateItemPrice(id, inputQtd) {
    if ($(inputQtd).val() < 1) {
        $(inputQtd).val(1);

        return;
    }

    const products = shoopingCartStorage.getAll();
    const product = products.find(product => product.id === id);
    
    $(`#product-price-${id}`).html(`R$ ${formatPrice(product.price * $(inputQtd).val())}`);

    updateTotalPrice();
}

function removeCartItem(id) {
    shoopingCartStorage.remove(id);
    showCart();
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2).replace('.', ',');
}

function updateTotalPrice() {
    const products = shoopingCartStorage.getAll();
    const totalPrice = products.reduce((total, product) => total + (product.price * $(`#product-qtd-${product.id}`).val()), 0);

    $('#total-price').html(`R$ ${formatPrice(totalPrice)}`);
}

// load js
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();

    if (window.location.pathname === `/cart.html`) {
        showCart();
    }

    if (window.location.pathname === `/index.html` || window.location.pathname === `/`) {
        loadProducts();
    }
});