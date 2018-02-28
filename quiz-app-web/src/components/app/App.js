import React, { Component } from 'react';
// import LoginBox from '../loginBox/loginBox';
import QuestionContainer from '../questionContainer/questionContainer';
import './App.css';
// import ScoreCard from '../scoreCard/scoreCard';

let maxLikes = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max: [],
      enableOrNot: false,
      idInuser: 0,
      total: 0,
      usernm: '',
      display: 0,
      user: [
        {
          uid: '',
          qid: 0,
          answered: false,
          max: 0,
        }],
      oldQuestions: [],
    };
  }


  componentDidMount() {
    fetch('/fetchUserDB')
      .then((response) => {
        if (!response.ok) {
          console.log('Network request failed');
        }
        return response;
      })
      .then((data) => { this.state.users = data; })
      .then(response => console.log(response));
  }


  onChangeHandler = (event) => {
    this.setState({ usernm: event.target.value });
  }

calculate = () => {
  // console.log(this.state.user);
  // const uid = this.state.usernm;
  // const totalVal = this.state.total;
  // for (let i = 0; i < this.state.user.length - 1; i += 1) {
  //   if (this.state.user[i].uid !== '') {
  //     for (let j = i + 1; j < this.state.user.length; j += 1) {
  //       if (this.state.user[i].uid === this.state.user[j].uid) {
  //         if (this.state.user[i].active) {
  //           maxLikes += 1;
  //           console.log('like');
  //         }
  //       }
  //     }
  //   }
  // }
  // maxObj.push(this.state.usernm : maxLikes);
  // console.log(maxObj);
  // fetch(`/updateToUsers/${uid}/${totalVal}`).then((response) => {
  //   console.log(response);
  // });
  fetch('/fetchUserDB')
    .then((response) => {
      if (!response.ok) {
        console.log('Network request failed');
      }
      return response;
    })
    .then((data) => {
      this.setState({
        user: data.json(),
      });
    });
  console.log(this.state);
  this.setState({
    display: 2,
  });
}


  loginButton = () => {
    for (let i = 0; i < this.state.user.length; i += 1) {
      let newUser = {};
      if (this.state.user[i].uid !== this.state.usernm) {
        newUser = {
          uid: this.state.usernm,
          qid: 0,
          answer: false,
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
playAgain=() => {
  this.setState({ display: 0 });
}


update=(flag, id, length) => {
  // console.log(id);
  for (let i = 0; i < this.state.user.length; i += 1) {
    if (this.state.user[i].uid === this.state.usernm) {
      this.state.user[i].uid = this.state.usernm;
      this.state.user[i].qid = id;
      this.state.user[i].answer = flag;
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
  if (flag) { maxLikes += 1; }

  if (length === 12) {
    this.setState({
      enableOrNot: true,
    });
  } else {
    this.setState({
      enableOrNot: false,
    });
  }
}
render() {
  if (this.state.display === 0) {
    maxLikes = 0;
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
          <button className="Footer" onClick={this.calculate} disabled={this.state.enableOrNot}>Calculate</button>
        </footer>
      </div>
    );
  }
  // const sortedScorers = this.state.users.data.sort((a, b) => a.total < b.total);
  // console.log(sortedScorers);
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
          {maxLikes}/12
        </div>

      </div>
      <button className="PlayAgain" onClick={this.playAgain}>
        PlayAgain
      </button>
    </div>
  );
}
}


export default App;
