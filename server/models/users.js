
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    qid: DataTypes.INTEGER,
    answered: DataTypes.BOOLEAN,
    total: DataTypes.INTEGER,
  }, {
    classMethods: {
      // associate(models) {
      //   // associations can be defined here
      // },
    },
  });
  return users;
};
