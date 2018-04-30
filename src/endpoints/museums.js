module.exports.fetchMuseumInfoHandler = serverState => (req, res, next) => {
    const {datastore} = serverState;
    const {museum_id} = req.params || {};

    if (!museum_id) {
        res.send(400, {
            message: "Museum id can't be empty"
        });
        next();
        return;
    }

    datastore.query("select * from myooz.museums where id=?", [museum_id], (error, results, fields) => {
        if (results.length > 0) {
            // Museum found
            res.send(200, results[0]);
            next();
            return;
        }

        // Museum doest not exist
        res.send(400, {
            message: "Museum does not exist."
        });
        next();
    });
};

module.exports.fetchAllMuseumInfoHandler = serverState => (req, res, next) => {
    const {datastore} = serverState;
    datastore.query("select * from myooz.museums", (error, results, fields) => {
        if (results.length > 0) {
            // Museum found
            res.send(200, results);
            next();
            return;
        }

        // Museum doest not exist
        res.send(400, {
            message: "Museum does not exist."
        });
        next();
    });
};