module.exports.fetchArtistInfoHandler = serverState => (req, res, next) => {
    const {datastore} = serverState;
    const {artist_id} = req.params || {};

    if (!artist_id) {
        res.send(400, {
            message: "Artist id can't be empty"
        });
        next();
        return;
    }

    datastore.query("select * from myooz.artists where id=?", [artist_id], (error, results, fields) => {
        if (results.length > 0) {
            // Artist found
            res.send(200, results[0]);
            next();
            return;
        }

        // Artist doest not exist
        res.send(400, {
            message: "Artist does not exist."
        });
        next();
    });
};

module.exports.fetchAllArtistInfoHandler = serverState => (req, res, next) => {
    const {datastore} = serverState;
    datastore.query("select * from myooz.artists", (error, results, fields) => {
        if (results.length > 0) {
            // Artist found
            res.send(200, results);
            next();
            return;
        }

        // Artist doest not exist
        res.send(400, {
            message: "Artist does not exist."
        });
        next();
    });
};