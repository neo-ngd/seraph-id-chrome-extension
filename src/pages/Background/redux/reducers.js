import { SET_WALLET, REMOVE_WALLET } from './const';

const initialState = 0;

export const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET:
      return state + (action.payload || 1);

    case REMOVE_WALLET:
      return {
        count: null,
      };
    default:
      return state;
  }
};
