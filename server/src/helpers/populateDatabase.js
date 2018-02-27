const models = require('../../models');

const populateDatabase = questionAnswers => new Promise((resolve, reject) => {
  // console.log(books);
  models.questionanswers.destroy({ truncate: true })
    .then(() =>
      models.questionanswers.bulkCreate(questionAnswers)
        .then((questions) => {
          resolve(questions);
        }))
    .catch(() => {
      reject(new Error('Could not add qa to database.'));
    });
});

module.exports = populateDatabase;
