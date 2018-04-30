const mysql = require("mysql");

module.exports.initDatastore = credentials => {
    const connection = mysql.createConnection({
        host: credentials.RDS_HOSTNAME,
        user: credentials.RDS_USERNAME,
        password: credentials.RDS_PASSWORD,
        port: credentials.RDS_PORT
    });

    connection.connect(err => {
        if (err) {
            console.error("Database connection failed: " + err.stack);
            return;
        }

        console.log("Connected to database.");
    });

    return connection;
};