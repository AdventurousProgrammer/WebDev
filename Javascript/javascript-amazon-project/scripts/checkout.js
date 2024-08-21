import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // defult export, when we only want to export 1 thing
import {deliveryOptions} from '../data/deliveryOptions.js'

// only 1 default export allowed, check money.js for default export
function renderOrderSummary()
{
  let cartSummaryHTML = '';
  // console.log(`current day: ${}`);
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const deliveryOptionId = cartItem.deliveryOptionId;
     
    let matchingProduct;
    let matchingOption;
  
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
  
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        matchingOption = option;
      }
    });
    const today = dayjs();
    const deliveryDate = today.add(matchingOption.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM DD');
  
    
    // Tuesday, August 20
  
    let currentDate = dayjs();
    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date js-delivery-date-${cartItem.productId}">
          Delivery Date:  ${dateString}
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
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });
  
  
  function deliveryOptionsHTML (matchingProduct, cartItem) 
  {
    let html = '';
    let deliveryDateString = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
      const dateString = deliveryDate.format('dddd, MMMM DD');
      const priceString = deliveryOption.priceCents === 0 ? `FREE`: `$${formatCurrency(deliveryOption.priceCents)}`
      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
  
      if(isChecked)
      {
        deliveryDateString = dateString;
      }
  
      console.log(`Is Chekced?: ${isChecked}`);
      html += `
    <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input js-delivery-option-input"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"
        name="delivery-option-${matchingProduct.id}"
        ${isChecked ? 'checked' : ''}
    >
      <div>
        <div class="delivery-option-date">
        ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
    ` ;     
    });
    console.log(`.js-delivery-date-${cartItem.productId}`);
    //document.querySelector(`.js-delivery-date-${cartItem.productId}`).innerHTML = `Delivery Date: ${deliveryDateString}`;
    return html;
  }
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
  
    // need to update the deliveryOptionID for each cart Item, when it is clicked 
  document.querySelectorAll('.js-delivery-option-input').forEach((button) => {
    const deliveryOptionId = button.dataset.deliveryOptionId;
    const productId = button.dataset.productId;
    button.addEventListener('click', () => {
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
  //cart.forEach((cartItem) => {})
  // for each delivery date string, check which one is clicked and update them 
  // use metadata  
    
}

renderOrderSummary();
