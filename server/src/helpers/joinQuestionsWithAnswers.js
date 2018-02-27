const axios = require('axios');

const joinQuestionsWithAnswers = questions => new Promise((resolve, reject) => {
  const questionsArray = questions.map(eachQuestion => ({
    id: eachQuestion.questionId,
    options: JSON.stringify({
      option1: eachQuestion.option1,
      option2: eachQuestion.option2,
      option3: eachQuestion.option3,
      option4: eachQuestion.option4,
    }),
    question: eachQuestion.question,
  }));

  const answersAPICallPromises = [];

  questionsArray.forEach((eachQuestion) => {
    const answersUrl = `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/${eachQuestion.id}`;
    const axiosGet = axios.get(answersUrl);
    answersAPICallPromises.push(axiosGet);
  });

  Promise.all(answersAPICallPromises)
    .then((answers) => {
      for (let i = 0; i < questionsArray.length; i += 1) {
        questionsArray[i].answer = answers[i].data.answer;
      }
    })
    .then(() => {
      const questionAnswerArray = questionsArray.sort((a, b) => a.id - b.id);
      resolve(questionAnswerArray);
    })
    .catch((reason) => {
      reject(new Error(reason.message));
    });
});
module.exports = joinQuestionsWithAnswers;
