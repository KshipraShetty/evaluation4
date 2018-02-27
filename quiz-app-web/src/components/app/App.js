import React, { Component } from 'react';
import LoginBox from '../loginBox/loginBox';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernm: '',
      display: 0,
      user: [
        {
          id: '',
          username: '',
          qid: '',
          answered: false,
          total: 0,
        }],
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
      .then((data) => { this.state.users = data; console.log(this.state.users); });
  }
  onChangeHandler = (event) => {
    this.setState({ usernm: event.target.value });
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
        break;
      }
    }

    fetch('/getQuestionsAndAnswers')
      .then((response) => {
        if (!response.ok) {
          console.log('Network request failed');
        }
        return response;
      })
      .then(data => data);
    this.setState({
      display: 1,
    });
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
    }

    return (
      <div className="App" >
        <header className="Header"> Quizzy </header>

      </div>
    );
  }
}


export default App;
