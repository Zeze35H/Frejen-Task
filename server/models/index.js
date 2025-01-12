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


module.exports = db;