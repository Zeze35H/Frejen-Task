const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Department = require("./department.model.js")(sequelize, Sequelize);
db.State = require("./state.model.js")(sequelize, Sequelize);
db.User = require("./user.model.js")(sequelize, Sequelize, db.Department);
db.Ticket = require("./ticket.model.js")(sequelize, Sequelize, db.User, db.Department, db.State);
db.Session = require("./session.model.js")(sequelize, Sequelize, db.User);

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
    { id: 5, name: 'José Henriques', email: 'je.henriques35@gmail.com', password: '$2b$10$8NvUNHFay6THXQGLlHtMo.SAFIDiJ/./mMzISZmpqib/.kbdITjke', id_department: 4, admin: true },
  ];

  const tickets = [
    { id: 1, title: 'Onboarding New Employee', description: 'Prepare onboarding materials for new hire.', created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-02T12:00:00Z', created_by: 1, updated_by: 5, id_state: 1, id_department: 1, },
    { id: 2, title: 'Fix Server Outage', description: 'Resolve the outage affecting production servers.', created_at: '2025-01-03T14:00:00Z', updated_at: '2025-01-04T16:00:00Z', created_by: 2, updated_by: 2, id_state: 3, id_department: 2, },
    { id: 3, title: 'Prepare Financial Report', description: 'Create and distribute Q4 financial summary.', created_at: '2025-01-05T08:00:00Z', updated_at: '2025-01-06T09:00:00Z', created_by: 3, updated_by: 3, id_state: 4, id_department: 3, },
    { id: 4, title: 'Client Follow-Up', description: 'Follow up with leads from last week’s conference.', reated_at: '2025-01-07T11:00:00Z', updated_at: '2025-01-08T13:00:00Z', created_by: 4, updated_by: 4, id_state: 2, id_department: 4, },
    { id: 5, title: "Bug in login", description: "Fix login redirect issue.", created_at: new Date("2025-01-01"), updated_at: new Date("2025-01-02"), created_by: 1, updated_by: 2, id_state: 1, id_department: 1 },
    { id: 6, title: "Update homepage", description: "Redesign the homepage layout.", created_at: new Date("2025-01-03"), updated_at: new Date("2025-01-04"), created_by: 2, updated_by: 3, id_state: 2, id_department: 2, observations: "Ensure it aligns with brand guidelines." },
    { id: 7, title: "Performance issue", description: "Investigate slow page load times.", created_at: new Date("2025-01-05"), updated_at: new Date("2025-01-06"), created_by: 1, updated_by: 1, id_state: 3, id_department: 1 },
    { id: 8, title: "Broken link", description: "Fix broken link on footer.", created_at: new Date("2025-01-02"), updated_at: new Date("2025-01-02"), created_by: 3, updated_by: 3, id_state: 4, id_department: 3, observations: "Link to contact page is missing." },
    { id: 9, title: "Add FAQ", description: "Create FAQ section.", created_at: new Date("2025-01-01"), updated_at: new Date("2025-01-03"), created_by: 4, updated_by: 2, id_state: 2, id_department: 4 },
    { id: 10, title: "Email notifications", description: "Implement email notifications for new tickets.", created_at: new Date("2025-01-07"), updated_at: new Date("2025-01-07"), created_by: 2, updated_by: 4, id_state: 3, id_department: 1 },
    { id: 11, title: "User analytics", description: "Add user analytics tracking.", created_at: new Date("2025-01-08"), updated_at: new Date("2025-01-09"), created_by: 3, updated_by: 1, id_state: 1, id_department: 2 },
    { id: 12, title: "Fix typo", description: "Correct typo in About page.", created_at: new Date("2025-01-10"), updated_at: new Date("2025-01-10"), created_by: 4, updated_by: 4, id_state: 4, id_department: 3 },
    { id: 13, title: "Add search", description: "Implement search functionality.", created_at: new Date("2025-01-11"), updated_at: new Date("2025-01-12"), created_by: 2, updated_by: 3, id_state: 2, id_department: 4 },
    { id: 14, title: "Dark mode", description: "Add dark mode toggle.", created_at: new Date("2025-01-01"), updated_at: new Date("2025-01-01"), created_by: 1, updated_by: 1, id_state: 1, id_department: 1, observations: "Ensure compatibility with all pages." },
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
          console.error(error);
        });
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
  }).catch((error) => {
    console.error(error);
  });
}).catch((error) => {
  console.error('Unable to create table: ', error);
});

module.exports = db;