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
