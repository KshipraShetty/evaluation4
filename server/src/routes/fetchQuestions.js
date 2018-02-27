const axios = require('axios');
const joinQusetionsWithAnswers = require('../helpers/joinQuestionsWithAnswers');
const populateDatabase = require('../helpers/populateDatabase');

const display = (request, response) => {
  axios.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions')
    .then(allQuestionsFromApi => allQuestionsFromApi.data.allQuestions)
    .then(questions => joinQusetionsWithAnswers(questions))
    .then(questionsWithAnswers => populateDatabase(questionsWithAnswers))
    .then((booksEntered) => {
      if (booksEntered) {
        response({
          data: booksEntered,
          statusCode: 200,
        });
      } else {
        throw new Error('Could not update books information');
      }
    })
    .catch((reason) => {
      response({
        data: {
          reason: reason.message,
        },
        statusCode: 500,
      });
    });
};

module.exports = [{
  path: '/getQuestionsAndAnswers',
  method: 'GET',
  handler: display,
}];
