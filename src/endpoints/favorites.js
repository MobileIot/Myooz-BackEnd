module.exports.favoriteNoteHandler = serverState => (req, res, next) => {
    const {datastore, sessionStorage} = serverState;
    const {note_id} = req.params || {};
    const {sessionKey} = req.cookies || {};

    const username = sessionStorage.getUser(sessionKey);

    if (!note_id) {
        res.send(400, {
            message: "Note id can't be empty."
        });
        next();
        return;
    }

    if (!username) {
        res.send(400, {
            message: "Unauthorized."
        });
        next();
        return;
    }

    datastore.query("select * from myooz.favorites where username=? and note_id=?",
        [username, note_id], (error, results, fields) => {
            if (results.length > 0) {
                // Already in favorites
                res.send(400, {
                    message: "Already in favorites."
                });
                next();
                return;
            }

            // Note doest not exist
            datastore.query("insert into myooz.favorites (username, note_id)" +
                " values (?, ?)",
                [username, note_id],
                (updateError, updateResults, updateFields) => {
                    if (updateError) {
                        res.send(400, {
                            message: updateError
                        });
                    } else {
                        res.send(200, {});
                    }
                });
            next();
        });
};

module.exports.unfavoriteNoteHandler = serverState => (req, res, next) => {
    const {datastore, sessionStorage} = serverState;
    const {note_id} = req.params || {};
    const {sessionKey} = req.cookies || {};

    const username = sessionStorage.getUser(sessionKey);

    if (!note_id) {
        res.send(400, {
            message: "Note id can't be empty."
        });
        next();
        return;
    }

    if (!username) {
        res.send(400, {
            message: "Unauthorized."
        });
        next();
        return;
    }

    datastore.query("select * from myooz.favorites where username=? and note_id=?",
        [username, note_id], (error, results, fields) => {
            if (error) {
                res.send(400, {
                    message: error
                });
                next();
                return;
            }
            if (results.length === 0) {
                // Not in favorites
                res.send(400, {
                    message: "Not in favorites."
                });
                next();
                return;
            }

            // Note exist
            datastore.query("delete from myooz.favorites where username=? and note_id=?",
                [username, note_id],
                (updateError, updateResults, updateFields) => {
                    if (updateError) {
                        res.send(400, {
                            message: updateError
                        });
                    } else {
                        res.send(200, {});
                    }
                });
            next();
        });
};

module.exports.fetchMyFavoritesHandler = serverState => (req, res, next) => {
    const {datastore, sessionStorage} = serverState;
    const {sessionKey} = req.cookies || {};

    const username = sessionStorage.getUser(sessionKey);

    if (!username) {
        res.send(400, {
            message: "Unauthorized."
        });
        next();
        return;
    }

    datastore.query("select * from myooz.favorites where username=?",
        [username], (error, results, fields) => {
            if (results.length > 0) {
                res.send(200, results);
            } else {
                res.send(400, {
                    message: "Already in favorites."
                });
            }
            next();
        });
};

module.exports.fetchNoteFavoriteCountHandler = serverState => (req, res, next) => {
    const {datastore, sessionStorage} = serverState;
    const {note_id} = req.params || {};

    if (!note_id) {
        res.send(400, {
            message: "Note id can't be empty."
        });
        next();
        return;
    }

    datastore.query("select count(*) as count from myooz.favorites where note_id=?",
        [note_id], (error, results, fields) => {
            if (results.length > 0) {
                res.send(200, results);
            } else {
                res.send(400, {
                    count: 0
                });
            }
            next();
        });
};
