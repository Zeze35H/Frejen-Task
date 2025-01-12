module.exports = (sequelize, Sequelize, User) => {
  const Session = sequelize.define("sessions", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sid: { // Session ID as required by connect-session-sequelize
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    data: { // Session data stored as a serialized string
      type: Sequelize.TEXT,
      allowNull: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    signed_in: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    expires: { // Required by connect-session-sequelize for session expiration
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  return Session;
};