import { LOGIN, LOGOUT } from './const';

export function login(data) {
  return {
    type: LOGIN,
    data,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
