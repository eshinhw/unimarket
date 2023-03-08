// https://frontend.turing.edu/lessons/module-3/advanced-react-hooks.html
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_UP_UNIMARKET":
      return { ...state, unimarket: action.payload };
    case "SET_UP_PROVIDER":
      return { ...state, provider: action.payload };
    case "SET_UP_ACCOUNT":
      return { ...state, account: action.payload };
    case "SET_UP_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    default:
      return state;
  }
};

export default reducer;
