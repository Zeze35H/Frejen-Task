const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const passport = require('passport');

const app = express();

var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON and handle session
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./models");

const sequelizeStore = new SequelizeStore({
    db: db.sequelize, // sequelize instance
    table: 'sessions', // custom session table
    logging: console.log,
    extendDefaultFields: (defaults, session) => {
        // Custom field mapping for id_user and signed_in
        return {
            id_user: session.id_user, // Map id_user if available
            signed_in: new Date(), // Map current timestamp for signed_in
        };
    },
});

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sequelizeStore,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days session expiration
    }
}));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/ticket.routes.js")(app);
require("./routes/state.routes.js")(app);
require("./routes/department.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/auth.routes.js")(app, passport, db);


// set port, listen for requests
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
