import React, { Component } from 'react';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playBoard: [],
      enable: '',
      // status: 'waiting',
      // canpPlay: '',
      playingComination: [],
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

    // this.setState({ playBoard: this.props.game.playBoard});

    return boardArr;
  }
  boardRender(cellNum) {
    // if (this.props.updatedValue && this.props.checkIndex === cellNum) {
    // //     currentValue= this.props.updatedValue;
    // currentValue = this.props.game.data.game.playBoard[cellNum];
    //     console.log('currentValue',currentValue);

    // } else {
    //   currentValue = 'play';
    // }
    console.log(this.props.game);
    return (
      <button
        className={'cell'}
        onClick={() => this.props.handleClick(cellNum)}
      >
        {this.props.game.data.game.playBoard[cellNum]}
      </button>
    );
  }

  render() {
    return (
      <>
        <div>{this.createBoard(3, 3)}</div>

        {/* <p>player 1 turn </p>
        <p>player 2 turn </p> */}
      </>
    );
  }
}

export default Game;
