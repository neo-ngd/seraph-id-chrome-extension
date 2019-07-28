const initialState = null;

//reducer
export default (state = initialState, action) => {
  console.log('set called', action);
  switch (action.type) {
    case 'SET_WALLET':
      return (state = action.wallet);
    default:
      return state;
  }
};
