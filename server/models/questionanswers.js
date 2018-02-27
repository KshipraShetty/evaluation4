
module.exports = (sequelize, DataTypes) => {
  const questionanswers = sequelize.define('questionanswers', {
    question: DataTypes.STRING,
    options: DataTypes.STRING,
    answer: DataTypes.STRING,
  }, {});
  // questionanswers.associate = function (models) {
  //   // associations can be defined here
  // };
  return questionanswers;
};
