module.exports = (sequelize, Sequelize, User, Department, State) => {
  return Ticket = sequelize.define("tickets", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    created_by: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    updated_by: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    id_state: {
      type: Sequelize.INTEGER,
      references: {
        model: State,
        key: 'id',
      },
    },
    id_department: {
      type: Sequelize.INTEGER,
      references: {
        model: Department,
        key: 'id',
      },
    },
  }, { timestamps: false });
};