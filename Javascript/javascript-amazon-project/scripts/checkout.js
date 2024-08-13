import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // defult export, when we only want to export 1 thing
// only 1 default export allowed, check money.js for default export
let cartSummaryHTML = '';
// console.log(`current day: ${}`);
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  // Tuesday, August 20

  let currentDate = dayjs();
  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date js-delivery-date">
        Delivery Date: 
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
              id="delivery-option-1-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date js-delivery-option-date-1">
              ${currentDate.add(9, 'day').format('dddd, MMMM DD')}
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
              id="delivery-option-2-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date js-delivery-option-date-2">
              ${currentDate.add(3, 'day').format('dddd, MMMM DD')}
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
              id="delivery-option-3-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date js-delivery-option-date-3">
              ${currentDate.add(1, 'day').format('dddd, MMMM DD')}
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
    });
  });

  cart.forEach((cartItem) => {
    let value;
    if(document.getElementById(`delivery-option-1-${cartItem.productId}`).checked)
      {
        value = document.querySelector('.js-delivery-option-date-1');
        document.querySelector('.js-delivery-date-').innerHTML = value.innerHTML;
      }
    else if(document.getElementById(`delivery-option-2-${cartItem.productId}`).checked)
      {
        value = document.querySelector('.js-delivery-option-date-2');
        document.querySelector('.js-delivery-date').innerHTML = value.innerHTML;
      }
    else
      {
        value = document.querySelector('.js-delivery-option-date-3');
        document.querySelector('.js-delivery-date').innerHTML = value.innerHTML;
      }
  });
  