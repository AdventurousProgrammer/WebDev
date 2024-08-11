import {cart, addToCart} from '../data/cart.js' // can also do import * as cartModule to do cartModule.cart, cartModule.addToCart
import {products} from '../data/products.js'
import { formatCurrency } from './utils/money.js';

console.log('Enter Amazon JS');

console.log('Initialized Products');
let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency((product.priceCents))}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary 
          js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});


function updateCartQuantity() // handles updating the webpage not managing cart, can decouple from updating webpage
{
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });
    document.querySelector('.cart-quantity').innerHTML = totalQuantity;
}


document.querySelector('.js-products-grid').innerHTML = productsHTML;

const addToCartButtons = document.querySelectorAll('.js-add-to-cart')

addToCartButtons.forEach((button, buttonIndex) =>{
        button.addEventListener('click', () => {
          // console.log('Added Product');
          // console.log(button.dataset);
          const productId = button.dataset.productId
          addToCart(productId);
          updateCartQuantity();
          console.log(cart);
          // console.log(`Cart Quantity: ${totalQuantity}`);
          // use data attribute to get product information from button
          //cart.push()
          //numItems++;
        });
});


/*
  // give each product a unique id, name doesnt cut it
// because ecommerce websites can have
 product with the same name, but different
  brands
*/
