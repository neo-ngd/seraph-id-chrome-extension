const initialState = null;

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WALLET':
      return (state = action.wallet);
    default:
      return state;
  }
};
