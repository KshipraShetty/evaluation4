import React, { Component } from 'react';
import './scoreCard.css';


class ScoreCard extends Component {
  render() {
    const scores = this.props.storedCards.map(eachScore => (
      <div className="EachCards"> {eachScore.id}<span> {eachScore.total}</span></div>
    ));
    return (
      <div className="ScoreCard" >
        {scores}
      </div>
    );
  }
}


export default ScoreCard;
