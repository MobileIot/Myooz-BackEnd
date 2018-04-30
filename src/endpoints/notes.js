const fs = require("fs");
module.exports.fetchNoteHandler = serverState => (req, res, next) => {
    const {datastore, sessionStorage} = serverState;
    const {note_id} = req.params || {};
    const {sessionKey} = req.cookies || {};

    if (!note_id) {
        res.send(400, {
            message: "Note id can't be empty"
        });
        next();
        return;
    }

    const username = sessionStorage.getUser(sessionKey);

    if (!username) {
        res.send(400, {
            message: "Unauthorized."
        });
        next();
        return;
    }

    datastore.query("select * from myooz.notes where id=? and (public=1 or username like ?)",
        [note_id, username], (error, results, fields) => {
            if (results.length > 0) {
                // Note found
                res.send(200, results[0]);
                next();
                return;
            }

            // Note doest not exist
            res.send(400, {
                message: "Note does not exist."
            });
            next();
        });
};

module.exports.fetchAllNotesHandler = serverState => (req, res, next) => {
    const {datastore, sessionStorage} = serverState;
    const {museum_id, artist_id, room_id, my_notes_only} = req.query || {};

    const {sessionKey} = req.cookies || {};

    const username = sessionStorage.getUser(sessionKey);

    datastore.query("select * from myooz.notes join myooz.artworks" +
        " where notes.artwork_id = artworks.id" +
        " and artworks.museum_id like ?" +
        " and artworks.artist_id like ?" +
        " and artworks.room_id like ?" +
        " and notes.username like ?" +
        " and (notes.public=1 or notes.username like?)",
        [museum_id || "%%", artist_id || "%%", room_id || "%%", my_notes_only ? username : "%%", username || "%%"],
        (error, results, fields) => {
            if (error) {
                res.send(400, {
                    message: error
                });
                next();
                return;
            }

            if (results.length > 0) {
                // Note found
                res.send(200, results);
                next();
                return;
            }

            // Note doest not exist
            res.send(400, {
                message: "Note does not exist."
            });
            next();
        });
};


module.exports.createNoteHandler = serverState => (req, res, next) => {
    const {datastore, objstore, sessionStorage} = serverState;
    const {content, artwork_id, is_public} = req.params || {};
    const {avatar} = req.files || {};
    const {sessionKey} = req.cookies || {};

    const likes = JSON.stringify("[]");
    const username = sessionStorage.getUser(sessionKey);

    if (!content || !artwork_id || is_public === undefined || !avatar) {
        res.send(400, {
            message: "Note content, artwork id, avatar and privacy can't be empty."
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
                datastore.query("insert into myooz.notes (avatar, content, likes, artwork_id, username, public)" +
                    " values (?, ?, ?, ?, ?, ?)",
                    [uploadData.Location, content, likes, artwork_id, username, is_public],
                    (updateError, updateResults, updateFields) => {
                        if (updateError) {
                            res.send(400, {
                                message: updateError
                            });
                        } else {
                            res.send(200, {});
                        }
                    });
            }
            next();
        });
    });
};