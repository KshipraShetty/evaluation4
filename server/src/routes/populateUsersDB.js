const models = require('../../models');

const display = (request, response) => {
  models.users.create(request.payload)
    .then((usersEntered) => {
      if (usersEntered) {
        response({
          data: usersEntered,
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
  path: '/populateUsersDB',
  method: 'POST',
  handler: display,
}];
