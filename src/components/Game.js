import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: Array(9).fill(''),
      player1score: 0,
      player2score: 0,
    };
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default Game;
