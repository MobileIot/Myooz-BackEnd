class SessionStorage {
    constructor() {
        this.storage = new Map();
    }

    addUser(username) {
        const sessionKey = Math.random().toString(36).substr(2, 5);
        this.storage.set(sessionKey, username);
        console.log(`[Session Storage] User added: ${username}: ${sessionKey}`);

        return sessionKey;
    }

    getUser(sessionKey) {
        return this.storage.get(sessionKey);
    }
};

module.exports.sessionStorage = new SessionStorage();