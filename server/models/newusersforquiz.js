
module.exports = (sequelize, DataTypes) => {
  const newusersforquiz = sequelize.define('newusersforquiz', {
    qid: DataTypes.INTEGER,
    answer: DataTypes.BOOLEAN,
    uid: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return newusersforquiz;
};
