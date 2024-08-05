export const cart = [];

export function addToCart(productId)
{
  let matchingItem;
  cart.forEach((cartItem, index) => {
    if(cartItem.productId === productId)
    {
      matchingItem = cartItem;
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
}

