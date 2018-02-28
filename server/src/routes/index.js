const fetchQuestions = require('./fetchQuestions');
const populateUsersDB = require('./populateUsersDB');
const fetchUserDB = require('./fetchUserDB');
const fetchQuestionDB = require('./fetchQuestionDB');
const updateToUsers = require('./updateToUsers');

module.exports = [].concat(fetchQuestions).concat(populateUsersDB).concat(fetchUserDB).concat(fetchQuestionDB)
  .concat(updateToUsers);
