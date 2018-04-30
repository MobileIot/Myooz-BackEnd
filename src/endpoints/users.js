"use strict";

const passwordHasher = s => {
    let a = 0, c = 0, h, o;

    for (h = s.length - 1; h >= 0; h--) {
        o = s.charCodeAt(h);
        a = (a << 6 & 268435455) + o + (o << 14);
        c = a & 266338304;
        a = c !== 0 ? a ^ c >> 21 : a;
    }
    return String(a);
};

module.exports.loginHandler = serverState => (req, res, next) => {
    const {datastore, sessionStorage} = serverState;

    const {username, password} = req.body;

    datastore.query("select * from myooz.users where username=?", [username], (error, results, fields) => {
        if (results.length > 0) {
            // User found
            if (passwordHasher(password) === results[0].password) {
                // Password correct
                const sessionKey = sessionStorage.addUser(results[0].username);
                res.setCookie("sessionKey", sessionKey, null);
                res.send(200, {
                    avatar: results[0].avatar
                });
                next();
                return;
            }
        }

        // User doest not exist or password incorrect
        res.send(400, {
            message: "User does not exist or incorrect password."
        });
        next();
    });
};

module.exports.registerHandler = serverState => (req, res, next) => {
    const sessionKey = req.cookies.sessionKey;
    next();
};

module.exports.updateProfileHandler = serverState => (req, res, next) => {
    next();
};


module.exports.fetchProfileHandler = serverState => (req, res, next) => {
    const {datastore, sessionStorage} = serverState;
    const username = req.params.username;

    datastore.query("select * from myooz.users where username=?", [username], (error, results, fields) => {
        if (results.length > 0) {
            // User found
            res.send(200, {
                avatar: results[0].avatar
            });
        } else {
            // User doest not exist
            res.send(400, {
                message: "User does not exist."
            });
        }

        next();
    })
};
