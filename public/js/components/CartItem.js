
function CartItem(product) {
    return `
    <div class="flex mt-5 bg-gray-100 px-10 py-5 rounded">
        <div class=""><img src="${product.image}"/></div>
        <div class="ml-5">
            <div class="font-sans font-bold text-lg">${product.name}</div>
            <div class="flex">
                <div class="">Quantidade</div>
                <input id="product-qtd-${product.id}" type="number" value="1" class="ml-5 w-8" onchange="updateItemPrice(${product.id}, this)">
                <div class="ml-5" id="product-price-${product.id}">R$ ${formatPrice(product.price)}</div>
                <div class="ml-5 cursor-pointer"><i class="fas fa-trash" onclick="removeCartItem(${product.id})"></i></div>
            </div>
        </div>
    </div>
    `;
}
