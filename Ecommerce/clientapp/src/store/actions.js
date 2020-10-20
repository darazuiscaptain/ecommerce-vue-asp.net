export const addProductToCart = ({ state, commit }, product) => {
  const index = state.cart.findIndex(
    (i) =>
      i.productId === product.productId &&
      i.colourId === product.colourId &&
      i.storageId === product.storageId
  );

  if (index >= 0) {
    commit("updateProductQuantity", index);
  } else {
    commit("addProductToCart", product);
  }
};

export const removeProductFromCart = ({ state, commit }, product) => {
  const index = state.cart.findIndex(
    (i) =>
      i.productId === product.productId &&
      i.colourId === product.colourId &&
      i.storageId === product.storageId
  );
  commit("removeProductFromCart", index);
};
