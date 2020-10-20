export const addProductToCart = (state, product) => {
  product.quantity = 1;
  state.cart.push(product);
};
export const updateProductQuantity = (state, index) => {
  let cartItem = Object.assign({}, state.cart[index]);
  cartItem.quantity++;
  state.cart.splice(index, 1, cartItem);
};

export const removeProductFromCart = (state, index) => {
  state.cart.splice(index, 1);
};
