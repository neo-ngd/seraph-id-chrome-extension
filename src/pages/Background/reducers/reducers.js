export const wallet = (state = null, action) => {
  switch (action.type) {
    case 'SET_WALLET':
      return action.wallet;
    default:
      return state;
  }
};
export const password = (state = null, action) => {
  switch (action.type) {
    case 'SET_PASSWORD':
      return action.password;
    default:
      return state;
  }
};
