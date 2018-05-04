const {loginHandler, registerHandler, updateProfileHandler, fetchProfileHandler} = require("./endpoints/users.js");
const {fetchMuseumInfoHandler, fetchAllMuseumInfoHandler} = require("./endpoints/museums.js");
const {fetchArtistInfoHandler, fetchAllArtistInfoHandler} = require("./endpoints/artists.js");
const {fetchArtworkHandler, fetchAllArtworksHandler} = require("./endpoints/artworks.js");
const {fetchNoteHandler, fetchAllNotesHandler, createNoteHandler, updateNoteHandler} = require("./endpoints/notes.js");
const {fetchMyFavoritesHandler, fetchNoteFavoriteCountHandler, favoriteNoteHandler, unfavoriteNoteHandler} = require("./endpoints/favorites.js");

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

// Artworks
server.get("/artworks/:artwork_id", fetchArtworkHandler(serverState));
server.get("/artworks", fetchAllArtworksHandler(serverState));

// Notes
server.get("/notes/:note_id", fetchNoteHandler(serverState));
server.get("/notes", fetchAllNotesHandler(serverState));
server.post("/notes", createNoteHandler(serverState));
server.put("/notes/:note_id", updateNoteHandler(serverState));

// Favorites
server.get("/favorites/:note_id", fetchNoteFavoriteCountHandler(serverState));
server.del("/favorites/:note_id", unfavoriteNoteHandler(serverState));
server.get("/favorites", fetchMyFavoritesHandler(serverState));
server.post("/favorites/:note_id", favoriteNoteHandler(serverState));
