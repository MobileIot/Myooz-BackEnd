const {loginHandler, registerHandler, updateProfileHandler, fetchProfileHandler} = require("./endpoints/users.js");
const {initDatastore} = require("./datastore.js");
const {credentials} = require("./credentials.js");
const {sessionStorage} = require("./sessions.js");

const restify = require("restify");
const server = restify.createServer();

server.listen(8080, () => {
    console.log("Server started.");
});

server.use(restify.plugins.queryParser());

const serverState = {
    datastore: initDatastore(credentials),
    sessionStorage: sessionStorage
};

// Users
server.post("/login", loginHandler(serverState));
server.post("/register", registerHandler(serverState));
server.post("/profile", updateProfileHandler(serverState));
server.get("/profile/:username", fetchProfileHandler(serverState));
