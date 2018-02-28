
module.exports = (sequelize, DataTypes) => {
  const newUsers = sequelize.define('newUsers', {
    username: DataTypes.STRING,
    qid: DataTypes.INTEGER,
    answered: DataTypes.BOOLEAN,
    total: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return newUsers;
};
