module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("departments", {
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

  return Department;
};