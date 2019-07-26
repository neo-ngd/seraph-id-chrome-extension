var seraphId = require('@sbc/seraph-id-sdk');

export function createWallet() {
  let wallet = new seraphId.SeraphIDWallet({ name: 'MyWallet' });
  console.log(wallet);
  return wallet;
}

export function createDid(wallet) {
  return wallet.createDID(DIDNetwork.PrivateNet);
}
