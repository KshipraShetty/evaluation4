const populateDatabase = require('../../src/helpers/populateDatabase');

describe('populate Database', () => {
  test('should return a promise', () => {
    expect(populateDatabase([])).toBeInstanceOf(Promise);
  });


  describe('should populate database', () => {
    test('when  array of question is passed as input', (done) => {
      populateDatabase([{
        id: 12,
        options: '{"option1":"New Delhi","option2":"MP","option3":"UP","option4":"Bangalore"}',
        question: 'What is the capital of India',
        answer: 'New Delhi',
      }])
        .then((questions) => {
          expect(questions.length).toBe(1);
          done();
        });
    });
  });
});
