export function checkWallet() {
  if (localStorage.getItem("wallet") === null) {
    return false;
  } else return true;
}

export function setWallet(wallet) {
  localStorage.setItem("wallet", wallet);
}
