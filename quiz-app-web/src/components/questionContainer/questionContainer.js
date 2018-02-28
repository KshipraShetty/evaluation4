import React, { Component } from 'react';
import './questionContainer.css';


class questionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      length: 0,
    };
  }


  check = (event) => {
    this.setState({
      length: this.state.length + 1,
    });
    console.log(this.state.length);

    let flag = false;
    if (event.target.value === this.props.questionObj.answer) {
      this.state.total += 1;
      flag = true;
      this.props.update(flag, this.props.questionObj.id, this.state.length);
    } else {
      this.props.update(flag, this.props.questionObj.id, this.state.length);
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
