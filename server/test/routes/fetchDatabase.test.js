const axiosTest = require('axios-test');
const server = require('../../src/server');
const { expectStatus } = require('axios-test/expect');

describe('route /getQuestionsAndAnswers', () => {
  test('should return a 200 statusCode', done =>
    axiosTest(server.listener)
      .get('/getQuestionsAndAnswers')
      .then(expectStatus(200)).then(done()));
});
