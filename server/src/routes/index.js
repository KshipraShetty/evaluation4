const fetchQuestions = require('./fetchQuestions');
const populateUsersDB = require('./populateUsersDB');
const fetchUserDB = require('./fetchUserDB');

module.exports = [].concat(fetchQuestions).concat(populateUsersDB).concat(fetchUserDB);
