const joinQuestionsWithAnswers = require('../../src/helpers/joinQuestionsWithAnswers');

describe('joinQuestionsWithAnswers helper', () => {
  test('should return a promise', () => {
    expect(joinQuestionsWithAnswers([])).toBeInstanceOf(Promise);
  });

  describe('should resolve giving a valid question with a valid answer', () => {
    test('when input is given from external api1', (done) => {
      joinQuestionsWithAnswers([
        {
          question: 'What is the capital of India',
          questionId: 12,
          option1: 'New Delhi',
          option2: 'MP',
          option3: 'UP',
          option4: 'Bangalore',
        }])
        .then((questionAnswer) => {
          expect(questionAnswer).toEqual([{
            id: 12,
            options: '{"option1":"New Delhi","option2":"MP","option3":"UP","option4":"Bangalore"}',
            question: 'What is the capital of India',
            answer: 'New Delhi',
          }]);
        });
      done();
    });
  });
});
