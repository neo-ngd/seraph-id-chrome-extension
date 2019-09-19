const initialState = { wallet: null, password: null };

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WALLET':
      return { ...state, wallet: action.wallet };
    case 'SET_PASSWORD':
      return { ...state, password: action.password };
    default:
      return state;
  }
};
