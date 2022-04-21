'use strict';
const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotal = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelectorAll('.basketTotalValue');


document.querySelector('cartIconWrap').addEventListener('click', () => {
    basketCounterEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
if (!event.target.closest('.addToCart')) {
    return;
}
const featuredItemEl = event.target.closest('.featuredItem');
const id = +featuredItemEl.dataset.id;
const name = featuredItemEl.dataset.name;
const price = +featuredItemEl.dataset.price;
addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if(!(id in basket)) {
        basket[id] = {id: id, name: name, price: price, count: 0};
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderNewProductInBasket (productId) {
    const basketRowEl = basketRowEl
    .querySelector('.basketRow[data-id="${productId}"]`');
    if (!basketRowEl) {
        renderProductInBasket(productId);
        return;
    }
    
const product = basket[productId];
basketRowEl.querySelector('.productCount').textContent = product.count;
basketRowEl
.querySelector('.productTotalRow')
.textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(productId) {
    const productRow = `
    <div class='basketRow' data-id='${productId}'>
    <div>${basket[productId].name}</div>
    <div>
    <span class='productCount'>${basket[productId].count}</span> шт.
    <div>${basket[productId].price}</div>
    <div>
    <span class='produtTotalRow'>${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
    </div>
    </div>
    </div>
    `;
    basketTotalValueEl.insertAdjacentHTML('beforebe', productRow);
}