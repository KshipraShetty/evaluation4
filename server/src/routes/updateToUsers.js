const models = require('../../models');


const display = (request, response) => {
  models.users.findOne({
    where: {
      id: request.params.uid,
    },
  })
    .then((user) => {
      console.log(user);
      user.update({ username: request.params.uid, total: request.params.totalVal });
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
  path: '/updateToUsers/{uid}/{totalVal}',
  method: 'GET',
  handler: display,
}];
