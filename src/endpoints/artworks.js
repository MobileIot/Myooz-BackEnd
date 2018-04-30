module.exports.fetchArtworkHandler = serverState => (req, res, next) => {
    const {datastore} = serverState;
    const {artwork_id} = req.params || {};

    if (!artwork_id) {
        res.send(400, {
            message: "Artwork id can't be empty"
        });
        next();
        return;
    }

    datastore.query("select * from myooz.artworks where id=?", [artwork_id], (error, results, fields) => {
        if (results.length > 0) {
            // Artwork found
            res.send(200, results[0]);
            next();
            return;
        }

        // Artwork doest not exist
        res.send(400, {
            message: "Artwork does not exist."
        });
        next();
    });
};

module.exports.fetchAllArtworksHandler = serverState => (req, res, next) => {
    const {datastore} = serverState;
    const {museum_id, artist_id, room_id} = req.query || {};

    datastore.query("select * from myooz.artworks where museum_id like ? and artist_id like ? and room_id like ?", [museum_id || "%%", artist_id || "%%", room_id || "%%"], (error, results, fields) => {
        if (error) {
            res.send(400, {
                message: error
            });
            next();
            return;
        }

        if (results.length > 0) {
            // Artwork found
            res.send(200, results);
            next();
            return;
        }

        // Artwork doest not exist
        res.send(400, {
            message: "Artwork does not exist."
        });
        next();
    });
};