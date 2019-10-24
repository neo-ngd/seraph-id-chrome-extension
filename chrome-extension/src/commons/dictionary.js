// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

export default {
    errors: {
        unknown: 'unknown error',
        invalidPassword: 'Invalid password',
        noCredentials: 'credential doesn\'t exists',
        noWallet: 'cannot find any wallet',
        claimDecline: 'user didn\'t accept to share the credential'
    },
    copyButton: {
        copy: 'Copy address!',
        copied: 'Copied!',
    },
    dialogs: {
        askAccept: 'Do you want to accept this claim?',
        wantTo: 'wants to access your',
        askShare: 'Do you want to share it?'
    },
    commons: {
        yes: 'Yes',
        no: 'No',
        address: 'Address',
        claims: 'Claims',
        password: 'Password',
        account: 'Account',
        accounts: 'Accounts',
        'import': 'import',
        another: 'another',
        'export': 'export',
        wallet: 'wallet',
    },
    accountModal: {
        exportWallet: 'Export wallet',
        importWallet: 'Import wallet',
    },
    createWallet: {
        title: 'Please choose a secure password',
        info: 'The password will be used to lock the extension after you close the browser and to encrypt the wallet if you decide to export it... so don’t forget it!',
        passwordInfo: 'Chose a password of at least 5 characters',
    },
    unlockWallet: {
        title: 'Welcome back',
        error: 'Invalid password. Try again.',
        info: 'To continue, please unlock your wallet',
        unlock: 'Unlock Wallet'
    },
    walletInfo: {
        info: 'No Claims yet? Why don’t you play around with our ',
        demo: 'demo',
    },
    welcome: {
        title: 'Welcome to Seraph ID',
        info: 'Seraph ID chrome extention allows you to manage your claims in a user-frielndly way',
        more: 'To start to use Seraph ID please create a wallet or import an existing one',
        link: 'Or import an existing one',
        button: 'Create a Wallet'
    },
    form: {
        error: 'Something went wrong! Try again.',
        success: 'Your wallet has been imported.',
        info: 'Please select a wallet to import.'
    },
    events: {
        saveClaimSuccess: 'The claim has been saved',
        importWalletSuccess: 'Your wallet has been imported',
    }
}
