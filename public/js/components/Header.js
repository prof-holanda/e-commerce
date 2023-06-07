
function Header() {
    return `
    <header class="bg-gray-100">
        <div class="container mx-auto flex justify-between items-center p-5">
            <div class="flex items-center">
                <a href="index.html" class="text-2xl font-bold text-gray-800"><i class="fas fa-user-md"></i></a>
                <ul class="flex ml-10">
                    <li><a href="#" class="text-gray-800 hover:text-gray-600">Home</a></li>
                    <li class="ml-5"><a href="#" class="text-gray-800 hover:text-gray-600">Produtos</a></li>
                    <li class="ml-5"><a href="#" class="text-gray-800 hover:text-gray-600">Sobre</a></li>
                </ul>
            </div>
            <div class="flex items-center">
                <a href="cart.html" class="text-gray-800 hover:text-gray-600">
                    <i class="fas fa-shopping-cart text-2xl"></i>
                </a>
            </div>
        </div>
    </header>
    `;
}