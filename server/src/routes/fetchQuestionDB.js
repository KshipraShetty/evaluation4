const models = require('../../models');


const display = (request, response) => {
  models.questionanswers.findAll()
    .then((users) => {
      if (users) {
        response({
          data: users,
          statusCode: 200,
        });
      } else {
        throw new Error('Could not fetch books information');
      }
    })

    .catch((reason) => {
      response({
        data: {
          reason: reason.message,
        },
        statusCode: 404,
      });
    });
};


module.exports = [{
  path: '/fetchQuestionDB',
  method: 'GET',
  handler: display,
}];
