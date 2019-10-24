// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

/**
 * The password service.
 * It stores and shares the password.
 */
class PasswordService {
    constructor() {
        this.pw = null;
    }

    set password(pw) {
        this.pw = pw;
    }

    get password() {
        return this.pw;
    }
}

export const pwService = new PasswordService();
