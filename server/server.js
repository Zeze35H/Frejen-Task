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

db.sequelize.sync({ force: true }).then(() => {
    const departments = [
        { id: 1, title: 'Human Resources' },
        { id: 2, title: 'IT Support' },
        { id: 3, title: 'Finance' },
        { id: 4, title: 'Sales' },
    ];

    const states = [
        { id: 1, title: 'Pending' },
        { id: 2, title: 'Rejected' },
        { id: 3, title: 'In Progress' },
        { id: 4, title: 'Completed' },
    ];

    const users = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', password: '$2b$10$8NvUNHFay6THXQGLlHtMo.SAFIDiJ/./mMzISZmpqib/.kbdITjke', id_department: 1, admin: true },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', password: '$2b$10$8NvUNHFay6THXQGLlHtMo.SAFIDiJ/./mMzISZmpqib/.kbdITjke', id_department: 2, admin: false },
        { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', password: '$2b$10$8NvUNHFay6THXQGLlHtMo.SAFIDiJ/./mMzISZmpqib/.kbdITjke', id_department: 3, admin: true },
        { id: 4, name: 'Dana White', email: 'dana@example.com', password: '$2b$10$8NvUNHFay6THXQGLlHtMo.SAFIDiJ/./mMzISZmpqib/.kbdITjke', id_department: 4, admin: false },
        { id: 5, name: 'José Henriques', email: 'je.henriques35@gmail.com', password: '$2b$10$8NvUNHFay6THXQGLlHtMo.SAFIDiJ/./mMzISZmpqib/.kbdITjke', id_department: 1, admin: true },
    ];

    const tickets = [
        {
            id: 1,
            title: 'Onboarding New Employee',
            description: 'Prepare onboarding materials for new hire.',
            created_at: '2025-01-01T10:00:00Z',
            updated_at: '2025-01-02T12:00:00Z',
            created_by: 1,
            updated_by: 1,
            id_state: 1,
            id_department: 1,
        },
        {
            id: 2,
            title: 'Fix Server Outage',
            description: 'Resolve the outage affecting production servers.',
            created_at: '2025-01-03T14:00:00Z',
            updated_at: '2025-01-04T16:00:00Z',
            created_by: 2,
            updated_by: 2,
            id_state: 3,
            id_department: 2,
        },
        {
            id: 3,
            title: 'Prepare Financial Report',
            description: 'Create and distribute Q4 financial summary.',
            created_at: '2025-01-05T08:00:00Z',
            updated_at: '2025-01-06T09:00:00Z',
            created_by: 3,
            updated_by: 3,
            id_state: 4,
            id_department: 3,
        },
        {
            id: 4,
            title: 'Client Follow-Up',
            description: 'Follow up with leads from last week’s conference.',
            created_at: '2025-01-07T11:00:00Z',
            updated_at: '2025-01-08T13:00:00Z',
            created_by: 4,
            updated_by: 4,
            id_state: 2,
            id_department: 4,
        },
    ];

    // User belongs to one Department, and a Department has many Users
    db.User.belongsTo(db.Department, { foreignKey: 'id_department', as: 'department' });
    db.Department.hasMany(db.User, { foreignKey: 'id_department', as: 'users' });

    // User has many Tickets (created_by) and Ticket belongs to one User
    db.User.hasMany(db.Ticket, { foreignKey: 'created_by', as: 'createdTickets' });
    db.Ticket.belongsTo(db.User, { foreignKey: 'created_by', as: 'creator' });

    // User has many Tickets (updated_by) and Ticket belongs to one User
    db.User.hasMany(db.Ticket, { foreignKey: 'updated_by', as: 'updatedTickets' });
    db.Ticket.belongsTo(db.User, { foreignKey: 'updated_by', as: 'updater' });

    // Department has many Tickets and Ticket belongs to one Department
    db.Department.hasMany(db.Ticket, { foreignKey: 'id_department', as: 'tickets' });
    db.Ticket.belongsTo(db.Department, { foreignKey: 'id_department', as: 'department' });

    // State has many Tickets and Ticket belongs to one State
    db.State.hasMany(db.Ticket, { foreignKey: 'id_state', as: 'tickets' });
    db.Ticket.belongsTo(db.State, { foreignKey: 'id_state', as: 'state' });


    db.Department.bulkCreate(departments, { validate: true }).then(() => {
        db.State.bulkCreate(states, { validate: true }).then(() => {
            db.User.bulkCreate(users, { validate: true }).then(() => {
                db.Ticket.bulkCreate(tickets, { validate: true }).then(() => {
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

app.use(passport.initialize());
app.use(passport.session());

require("./routes/ticket.routes.js")(app);
require("./routes/state.routes.js")(app);
require("./routes/auth.routes.js")(app, passport, db);


// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
