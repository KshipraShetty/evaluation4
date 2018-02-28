import React, { Component } from 'react';
// import LoginBox from '../loginBox/loginBox';
import QuestionContainer from '../questionContainer/questionContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idInuser: 0,
      total: 0,
      usernm: '',
      display: 0,
      user: [
        {
          id: '',
          username: '',
          qid: 0,
          answered: false,
          total: 0,
        }],
      oldQuestions: [],
    };
  }


  componentWillMount() {
    fetch('/fetchUserDB')
      .then((response) => {
        if (!response.ok) {
          console.log('Network request failed');
        }
        return response;
      })
      .then(data => data.json())
      .then((data) => { this.state.users = data; });
  }


  onChangeHandler = (event) => {
    this.setState({ usernm: event.target.value });
  }

calculate = () => {
  const uid = this.state.usernm;
  const totalVal = this.state.total;
  fetch(`/updateToUsers/${uid}/${totalVal}`).then((response) => {
    console.log(response);
  });
  this.setState({
    display: 2,
  });
}


  loginButton = () => {
    for (let i = 0; i < this.state.user.length; i += 1) {
      let newUser = {};
      if (this.state.user[i].id !== this.state.usernm) {
        newUser = {
          id: this.state.usernm,
          username: this.state.usernm,
          qid: 0,
          answered: false,
          total: 0,
        };
        this.setState({
          display: 1,
        });
        if (this.state.user[i].id === '') { this.state.user[i] = newUser; } else this.state.user = this.state.user.concat(newUser);
        fetch('/populateUsersDB', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.user[i]),
        })
          .then(response => console.log(response));
        fetch('/getQuestionsAndAnswers')
          .then((response) => {
            if (!response.ok) {
              console.log('Network request failed');
            }
            return response;
          })
          .then(data => data);

        fetch('/fetchQuestionDB')
          .then((response) => {
            if (!response.ok) {
              console.log('Network request failed');
            }
            return response;
          })
          .then(data => data.json())
          .then(oldquestions => oldquestions.data)
          .then((oldqs) => {
            this.setState({
              oldQuestions: [...oldqs],
            });
          });

        this.setState({
          display: 1,
        });
        break;
      }
      newUser = {
        id: this.state.usernm,
        username: this.state.usernm,
        qid: 0,
        answered: false,
        total: 0,
      };
      this.setState({
        display: 1,
      });
    }
  }

  update=(flag, id) => {
    // console.log(id);
    for (let i = 0; i < this.state.user.length; i += 1) {
      if (this.state.user[i].id === this.state.usernm) {
        this.state.user[i].username = this.state.usernm;
        this.state.user[i].qid = id;
        this.state.user[i].answer = flag;
        if (flag === true) {
          this.state.user[i].total += 1;
          this.state.total += 1;
        } else if (flag === false) {
          this.state.total += -1;
          this.state.user[i].total -= 1;
        }
        this.state.idInuser = i;
      }
      fetch('/populateUsersDB', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.user[i]),
      });
    }
  }
  render() {
    if (this.state.display === 0) {
      // <LoginBox welcome="Welcome" to="to" quizzy="Quizzy!"
      // loginHead="Login" username="UserName" loginButton={this.questionsLoader} />
      return (
        <div className="App" >
          <header className="Header"> Quizzy </header>
          <div className="MainBody">
            <div className="LoginBox" >
              <div className="Welcome"> <div className="WelcomeText">Welcome</div>
                <div className="WelcomeToText">To</div>
                <div className="QuizzyText">Quizzy!
                </div>
              </div>
              <div className="Login">
                <div className="LoginHeading">
                  Login
                </div>
                <div className="LoginHeading">
                  UserName
                </div>
                <div >
                  <input className="UsernameInput" type="text" onChange={this.onChangeHandler} />
                </div>
                <button className="LoginButton" onClick={this.loginButton}>Login </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.display === 1) {
      console.log(this.state.user.length);
      const total = 0;
      const oldQuestions = this.state.oldQuestions.map(question => (
        <QuestionContainer
          questionObj={question}
          questionText="Question"
          options={JSON.parse(question.options)}
          check={this.checkAnswer}
          total={total}
          {...this.state}
          update={this.update}
        />
      ));
      return (
        <div className="App" >
          <header className="Header">
            <div>Quizzy</div>
            <div> Hello {this.state.usernm}</div>
          </header>
          <div className="MainBodyQuiz">
            {oldQuestions}
          </div>
          <footer>
            <button className="Footer" onClick={this.calculate}>Calculate</button>
          </footer>
        </div>
      );
    }
    console.log(this.state.users.data);
    const sortedScorers = this.state.users.data.sort((a, b) => a.total < b.total);
    console.log(sortedScorers);
    return (
      <div className="App" >
        <header className="Header">
          <div>Quizzy</div>
          <div> Hello {this.state.usernm}</div>
        </header>
        <div className="ScoreBoard">
          <div className="ScoreHead">
        Your Score
          </div>
          <div className="Score" >
            {this.state.user[this.state.idInuser].total}/12
          </div>
          <div className="ScoreCard">
            <div> {sortedScorers[0].id}<span> {sortedScorers[0].total}</span></div>
            <div> {sortedScorers[1].id}<span> {sortedScorers[1].total}</span></div>
            <div> {sortedScorers[2].id}<span> {sortedScorers[2].total}</span></div>
            <div> {sortedScorers[3].id}<span> {sortedScorers[3].total}</span></div>
            <div> {sortedScorers[4].id}<span> {sortedScorers[4].total}</span></div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
