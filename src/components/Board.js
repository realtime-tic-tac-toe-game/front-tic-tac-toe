import React, { Component } from 'react';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: true,
      player2: false,
    };
  }

  createBoard(row, col) {
    let boardArr = [];
    let cellNum = 0;

    for (let i = 0; i < row; i++) {
      let colArr = [];
      for (let j = 0; j < col; j++) {
        colArr.push(this.boardRender(cellNum++));
      }
      boardArr.push(
        <div key={i} className={'row'}>
          {colArr}
        </div>
      );
    }

    return boardArr;
  }

  boardRender(cellNum) {
    return <button className={'cell'}>play</button>;
  }

  render() {
    return (
      <>
        <div>{this.createBoard(3, 3)}</div>

        <p>player 1 turn </p>
        <p>player 2 turn </p>
      </>
    );
  }
}

export default Board;
