module.exports = (sequelize, Sequelize) => {
  const State = sequelize.define("states", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, { timestamps: false });

  return State;
};