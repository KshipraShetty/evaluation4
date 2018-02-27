import React, { Component } from 'react';
import './loginBox.css';
import LoginText from '../loginText/loginText';

class LoginBox extends Component {
  render() {
    return (
      <div className="LoginBox" >
        <div className="Welcome"> <div className="WelcomeText">{this.props.welcome}</div>
          <div className="WelcomeToText">{this.props.to}</div>
          <div className="QuizzyText">{this.props.quizzy}
          </div>
        </div>
        <div className="Login">
          <div className="LoginHeading">
            {this.props.loginHead}
          </div>
          <div className="LoginHeading">
            {this.props.username}
          </div>
          <LoginText />
          <button className="LoginButton" onClick={this.props.loginButton}>Login </button>
        </div>
      </div>
    );
  }
}


export default LoginBox;
