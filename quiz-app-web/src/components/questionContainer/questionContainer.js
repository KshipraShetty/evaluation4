import React, { Component } from 'react';
import './questionContainer.css';


class questionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }


  check = (event) => {
    let flag = false;
    if (event.target.value === this.props.questionObj.answer) {
      this.state.total += 1;
      flag = true;
      this.props.update(flag, this.props.questionObj.id);
    } else {
      this.state.total -= 1;
      this.props.update(flag, this.props.questionObj.id);
    }
  }
  render() {
    let opts = [];
    opts = Object.values(this.props.options).map(eachOpt => (
      <div>
        <input
          type="radio"
          name="answer"
          value={eachOpt}
          onClick={this.check}
          checked
        />{eachOpt}<br />
      </div>
    ));
    return (
      <div className="QuestionContainer">
        <div className="QuestionNo">
          {this.props.questionText} {this.props.questionObj.id}
        </div>
        <div className="Question">
          {this.props.questionObj.question}
        </div>
        <div className="Options">
          {opts}
        </div>
      </div>
    );
  }
}

export default questionContainer;
