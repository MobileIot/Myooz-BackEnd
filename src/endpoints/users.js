"use strict";

module.exports.loginHandler = serverState => (req, res, next) => {
    sessionStorage.addUser(results[0].username);
    next();
};

module.exports.registerHandler = serverState => (req, res, next) => {
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
