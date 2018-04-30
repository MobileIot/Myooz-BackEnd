const {loginHandler, registerHandler, updateProfileHandler, fetchProfileHandler} = require("./endpoints/users.js");
const {fetchMuseumInfoHandler, fetchAllMuseumInfoHandler} = require("./endpoints/museums.js");
const {fetchArtistInfoHandler, fetchAllArtistInfoHandler} = require("./endpoints/artists.js");

const {initDatastore} = require("./datastore.js");
const {initObjectStore} = require("./objstore.js");
const {credentials} = require("./credentials.js");
const {sessionStorage} = require("./sessions.js");

const restify = require("restify");
const server = restify.createServer();
const cookieParser = require('restify-cookies');

server.listen(8080, () => {
    console.log("Server started.");
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(cookieParser.parse);

const serverState = {
    datastore: initDatastore(credentials),
    objstore: initObjectStore(credentials),
    sessionStorage: sessionStorage
};

// Users
server.post("/login", loginHandler(serverState));
server.post("/register", registerHandler(serverState));
server.post("/profile", updateProfileHandler(serverState));
server.get("/profile/:username", fetchProfileHandler(serverState));

// Museums
server.get("/museums/:museum_id", fetchMuseumInfoHandler(serverState));
server.get("/museums", fetchAllMuseumInfoHandler(serverState));

// Artists
server.get("/artists/:artist_id", fetchArtistInfoHandler(serverState));
server.get("/artists", fetchAllArtistInfoHandler(serverState));
