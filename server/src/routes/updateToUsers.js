const models = require('../../models');


const display = (request, response) => {
  models.newusersforquiz.findOne({
    where: {
      id: request.params.uid,
    },
  })
    .then((user) => {
      console.log(user);
      user.update({ uid: request.params.uid, qid: request.params.qid, answer: request.params.answer });
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
  path: '/updateToUsers/{uid}/{totalVal}/{qid}',
  method: 'GET',
  handler: display,
}];
