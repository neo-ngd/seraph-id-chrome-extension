import { DIDNetwork, SeraphIDWallet, SeraphIDIssuer } from '@sbc/seraph-id-sdk';
import {createClaim, createDid, createWallet, decrypt, getDid} from "../seraphSdkUtils";

jest.mock('@sbc/seraph-id-sdk');
describe('seraphSdkUtils', () => {
    const wallet = ({test: 'test'});
    SeraphIDWallet.mockImplementation(() => wallet);
    it('should create the wallet', () => {
        expect(createWallet('test')).toStrictEqual(wallet);
    });

    it('should decrypt the wallet', async () => {
        const account = {
            decrypt: () => new Promise(res => res())
        };
        const wallet = {accounts: [account]};
        SeraphIDWallet.mockImplementation(() => wallet);
        const rec = await decrypt(JSON.stringify(wallet), '');
        expect(rec).toStrictEqual(wallet);
    });

    it('should throw an error during wallet decryption', async () => {
        SeraphIDWallet.mockImplementation(() => {
            throw new Error();
        });
        const rec = await decrypt(JSON.stringify(wallet), '');
        expect(rec).toStrictEqual(null);
    });

    it('should create the DID', () => {
        const wallet = {
            accounts: [{label: 'test'}]
        };
        expect(getDid(wallet)).toEqual(`did:neoid:priv:${wallet.accounts[0].label}`)
    });

    it('should create the claim', () => {
        const wallet = {
            accounts: [{label: 'test'}]
        };
        const claim = {test: 'test'};
        const issuer = {
            registerNewSchema: jest.fn(),
            createClaim: () => claim,
        };
        SeraphIDIssuer.mockImplementation(() => issuer);
        expect(createClaim('test', {}, wallet)).toStrictEqual(claim);
    });

    it('should create the DID', () => {
       const wallet = {
           createDID: jest.fn()
       };
       createDid(wallet);
       expect(wallet.createDID).toHaveBeenCalledWith(DIDNetwork.PrivateNet)
    });
});
