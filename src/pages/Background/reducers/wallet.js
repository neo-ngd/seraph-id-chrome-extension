
const initialState = { wallet: null, password: null };


//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WALLET':
      return { ...state, wallet: action.wallet };
    default:
      return state;
  }
};
