"use strict";

const fs = require("fs");
const DEFAULT_AVATAR_URL = "http://www.zimphysio.org.zw/wp-content/uploads/2018/01/default-avatar-2.jpg";

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
    const {username, password} = req.body || {};

    if (!username || !password) {
        res.send(400, {
            message: "Username or password can't be empty"
        });
        next();
        return;
    }

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
    const {datastore, sessionStorage} = serverState;
    const {username, password} = req.body || {};

    if (!username || !password) {
        res.send(400, {
            message: "Username or password can't be empty"
        });
        next();
        return;
    }

    datastore.query("select * from myooz.users where username=?", [username], (error, results, fields) => {
        if (results.length > 0) {
            // User found
            res.send(400, {
                message: "The username has been registered."
            });
        } else {
            // New user
            datastore.query("insert into myooz.users values(?,?,?)", [username, passwordHasher(password), DEFAULT_AVATAR_URL], (addError, addResults, addFields) => {
                if (error) {
                    res.send(400, {
                        message: "Some error occurred during the registration."
                    });
                } else {
                    const sessionKey = sessionStorage.addUser(username);
                    res.setCookie("sessionKey", sessionKey, null);
                    res.send(200, {
                        avatar: DEFAULT_AVATAR_URL
                    });
                }
            });
        }
        next();
    });
};

module.exports.updateProfileHandler = serverState => (req, res, next) => {
    const {datastore, sessionStorage, objstore} = serverState;
    const {avatar} = req.files || {};
    const {sessionKey} = req.cookies || {};

    const username = sessionStorage.getUser(sessionKey);

    if (!username) {
        res.send(400, {
            message: "Unauthorized."
        });
        next();
        return;
    }

    if (!avatar) {
        res.send(400, {
            message: "Avatar can't be empty"
        });
        next();
        return;
    }

    datastore.query("select * from myooz.users where username=?", [username], (error, results, fields) => {
        if (results.length > 0) {
            // User found
            fs.readFile(avatar.path, (err, data) => {
                if (err) {
                    res.send(400, {
                        message: err
                    });
                    next();
                    return;
                }

                objstore(avatar.name, new Buffer(data, "binary"), (uploadErr, uploadData) => {
                    if (uploadErr) {
                        res.send(400, {
                            message: uploadErr
                        });
                    } else {
                        datastore.query("update myooz.users set avatar=? where username=?", [uploadData.Location, username], (updateError, updateResults, updateFields) => {
                            if (updateError) {
                                res.send(400, {
                                    message: updateError
                                });
                            } else {
                                res.send(200, {
                                    avatar: uploadData.Location
                                });
                            }
                        });
                    }
                });
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


module.exports.fetchProfileHandler = serverState => (req, res, next) => {
    const {datastore} = serverState;
    const {username} = req.params || {};

    if (!username) {
        res.send(400, {
            message: "Username can't be empty"
        });
        next();
        return;
    }

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
