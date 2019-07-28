import { DIDNetwork, SeraphIDWallet } from '@sbc/seraph-id-sdk';

export function createWallet() {
  let wallet = new SeraphIDWallet({ name: 'MyWallet' });
  return wallet;
}

export function createDid(wallet) {
  return wallet.createDID(DIDNetwork.PrivateNet);
}
