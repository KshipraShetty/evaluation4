const models = require('../../models');


const display = (request, response) => {
  models.users.findAll()
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
  path: '/fetchUserDB',
  method: 'GET',
  handler: display,
}];
