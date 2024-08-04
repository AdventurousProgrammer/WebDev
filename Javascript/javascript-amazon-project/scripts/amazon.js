console.log('Enter Amazon JS');
/*
const products = [{
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    rating: {
        stars: 4.5,
        count: 87,
    },
    priceCents: 1090
},
{
    name: 'Intermediate Size Basketball',
    image: 'images/products/intermediate-composite-basketball.jpg',
    rating: {
        stars: 4,
        count: 127,
    },
    priceCents: 2095
},
{
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    rating:{
        stars: 4.5,
        count: 56,
    },
    priceCents: 799
},
]
*/
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
            ${(product.priceCents / 100).toFixed(2)}
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

document.querySelector('.js-products-grid').innerHTML = productsHTML;

const addToCartButtons = document.querySelectorAll('.js-add-to-cart')

addToCartButtons.forEach((button, buttonIndex) =>{
        button.addEventListener('click', () => {
          console.log('Added Product');
          console.log(button.dataset);
          const productId = button.dataset.productId
          
          let matchingItem;
          cart.forEach((item, index) => {
            if(item.productId === productId)
            {
              matchingItem = item;
            }
          });

          if(matchingItem)
          {
            matchingItem.quantity++;
          }
          else
          {
            cart.push({
              productId: productId,
              quantity: 1
            });
          }

          let totalQuantity = 0;
          cart.forEach((item) => {
            totalQuantity += item.quantity;
          });
          document.querySelector('.cart-quantity').innerHTML = totalQuantity;

          console.log(cart);
          console.log(`Cart Quantity: ${totalQuantity}`);
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
