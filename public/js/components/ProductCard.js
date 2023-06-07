
function ProductCard(props) {
    const { id, name, price, image } = props.product;
    let button = `<button class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded" onclick="addToCart(${id}, this)">Comprar</button>`;

    if (props.addedToCart) {
        button = '<button class="px-3 py-1 bg-slate-50 text-sm text-slate-400 font-semibold rounded" disabled>Added to cart</button>';
    }

    return `
    <div class="w-80 p-3">
        <div class="bg-white shadow-lg rounded-lg">
            <div class="py-2">
                <img src="${image}" alt="product ${name} image" class="w-full object-cover">
                <h2 class="font-sans text-lg font-semibold">${name}</h2>
            </div>
            <div class="flex justify-between px-4 py-2 bg-gray-900">
                <h1 class="text-gray-200 font-bold text-xl">R$ ${formatPrice(price)}</h1>
                ${button}
            </div>
        </div>
    </div>
    `;
}