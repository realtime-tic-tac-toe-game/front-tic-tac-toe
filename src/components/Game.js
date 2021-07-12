import React, { Component } from 'react';
import Board from './Board';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL;
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: Array(9).fill(''),
      player1score: 0,
      player2score: 0,
    };
  }
  // componentDidMount() {
  //   // const payload = {
  //   //   created_at: new Date().toLocaleString(),
  //   // };
  //   // console.log('hello from create', payload);
  //   // socket.emit('createGame', payload);
  // }

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default Game;
