const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WALLET':
      return state + (action.payload || 1);
    default:
      return state;
  }
};
