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

export const setProductQuantity = (state, payload) => {
  let cartItem = Object.assign({}, state.cart[payload.index]);
  cartItem.quantity = payload.quantity;
  state.cart.splice(payload.index, 1, cartItem);
};

export const initialise = (state) => {
  const store = localStorage.getItem("store");
  if (store) {
    Object.assign(state, JSON.parse(store));
  }
};

export const showAuthModal = (state) => {
  state.showAuthModal = true;
};

export const hideAuthModal = (state) => {
  state.showAuthModal = false;
};

export const loginRequest = (state) => {
  state.loading = true;
};

export const loginSuccess = (state, payload) => {
  state.auth = payload;
  state.loading = false;
};

export const loginError = (state) => {
  state.loading = false;
};

export const registerRequest = (state) => {
  state.loading = true;
};

export const registerSuccess = (state) => {
  state.loading = false;
};

export const registerError = (state) => {
  state.loading = false;
};

export const logout = (state) => {
  state.auth = null;
};
