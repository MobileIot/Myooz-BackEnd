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

module.exports.fetchMyFavoritesHandler = serverState => (req, res, next) => {
    next();
};

module.exports.fetchNoteFavoriteInfoHandler = serverState => (req, res, next) => {
    next();
};
